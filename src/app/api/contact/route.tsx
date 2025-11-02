import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/utils/emailHelpers";
import { ContactNotification } from "@/components/blocks/emails/contact/ContactNotification";
import { ContactConfirmation } from "@/components/blocks/emails/contact/ContactConfirmation";
import { z } from "zod";
import dns from "dns/promises";
import NodeCache from "node-cache";
import { isValidPhoneNumber } from "react-phone-number-input";

// 🧩 Simple in-memory rate limit cache
const rateCache = new NodeCache({ stdTTL: 60 }); // 60s window per IP

// 🧠 Schema validation
const ContactSchema = z.object({
    name: z.string().min(2),
    surname: z.string().min(2),
    email: z
        .string()
        .email()
        .refine((val) => {
            const lower = val.toLowerCase();
            const blockedDomains = [
                "example.com",
                "test.com",
                "abc.com",
                "mailinator.com",
                "tempmail.com",
                "yopmail.com",
            ];
            return !blockedDomains.some((domain) => lower.endsWith(domain));
        }, { message: "Invalid or disposable email address." }),
    phone: z
        .string()
        .refine((val) => isValidPhoneNumber(val || ""), { message: "Invalid phone number" })
        .refine((val) => !/[,;/]/.test(val || ""), { message: "Only one phone number allowed" }),
    department: z.string().min(1),
    message: z.string().min(5),
    to: z.string().email(),
    cc: z.union([z.string(), z.array(z.string())]).optional(),
});

// 🔍 Helper: MX record validation
async function validateEmailDomain(email: string) {
    const domain = email.split("@")[1];
    if (!domain) return false;
    try {
        const records = await dns.resolveMx(domain);
        return records && records.length > 0;
    } catch {
        return false;
    }
}

// 🚦 Helper: Rate limiter
function rateLimit(ip: string, limit = 3) {
    const key = `rate-${ip}`;
    const current = rateCache.get<number>(key) || 0;

    if (current >= limit) return false; // too many requests

    rateCache.set(key, current + 1, 60); // expire after 60s
    return true;
}

export async function POST(req: Request) {
    try {
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0] ||
            "unknown";
        console.log("📩 Request from IP:", ip);

        // 🚦 Rate limit check
        if (!rateLimit(ip)) {
            return NextResponse.json(
                { success: false, message: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        const body = await req.json();
        const data = ContactSchema.parse(body);

        // 🔍 Verify MX record
        const isValidMX = await validateEmailDomain(data.email);
        if (!isValidMX) {
            return NextResponse.json(
                { success: false, message: "Invalid email domain. Please use a valid email address." },
                { status: 400 }
            );
        }

        const { name, surname, email, phone, department, message, to, cc } = data;
        const fullName = [name, surname].filter(Boolean).join(" ");
        const ccList =
            Array.isArray(cc) ? cc.join(", ") : typeof cc === "string" && cc.includes(",") ? cc : cc ? [cc].join(", ") : "";

        const subject = `New Inquiry from ${fullName} - ${department || "General"}`;

        // ✉️ Send to Admin
        await sendEmail({
            to,
            cc: ccList,
            subject,
            component: (
                <ContactNotification
                    name={name}
                    surname={surname}
                    email={email}
                    phone={phone}
                    department={department}
                    message={message}
                />
            ),
            from: `"${fullName}" <${email}>`,
        });

        // ✉️ Send Confirmation to User
        await sendEmail({
            to: email,
            subject: "We’ve received your message!",
            component: <ContactConfirmation name={name} message={message} department={department} />,
        });

        // 💾 Send to WordPress (with SSL bypass in dev)
        if (process.env.NODE_ENV === "development") {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        }

        const wpResponse = await fetch(
            `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/matrix-email/v1/submit`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.WP_API_KEY || "",
                },
                body: JSON.stringify({
                    form_type: "contact",
                    name: fullName,
                    email,
                    subject,
                    message,
                    to_email: `${to}${ccList ? ", " + ccList : ""}`,
                    phone,
                    department,
                }),
            }
        );

        if (!wpResponse.ok) {
            console.warn("⚠️ WordPress API error:", await wpResponse.text());
        }

        return NextResponse.json({
            success: true,
            message: "✅ Email sent and data stored successfully.",
        });
    } catch (error: any) {
        if (error.name === "ZodError") {
            return NextResponse.json(
                { success: false, message: "Validation failed", errors: error.errors },
                { status: 400 }
            );
        }

        console.error("❌ Error in contact route:", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong. Please try again later." },
            { status: 500 }
        );
    }
}
