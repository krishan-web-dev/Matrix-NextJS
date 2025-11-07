import { NextResponse } from "next/server";
import { sendEmail, sendToWordPress, validateEmailDomain, rateLimit, blockedDomains } from "@/lib/utils";
import { contactSchema } from "@/lib/validation";
import { ContactNotification, ContactConfirmation } from "@/emails";
import React from "react";

/**
 * Check if email domain is blocked
 */
function isBlockedEmail(email: string): boolean {
    const domain = email.split("@")[1]?.toLowerCase();
    if (!domain) return true;
    return blockedDomains.some((blocked) => domain.endsWith(blocked));
}

/**
 * POST /api/contact
 */
export async function POST(req: Request) {
    try {
        // 🧩 Rate limiting
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
        if (!rateLimit(ip)) {
            return NextResponse.json(
                { success: false, message: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        const body = await req.json();
        const data = contactSchema.parse(body);

        const { name, surname, email, phone, department, message, to, cc } = data;
        const fullName = [name, surname].filter(Boolean).join(" ");
        const ccList = Array.isArray(cc) ? cc.join(",") : cc || "";

        // 🚫 Blocked email domain check
        if (isBlockedEmail(email)) {
            return NextResponse.json(
                { success: false, message: "Email domain is not allowed." },
                { status: 400 }
            );
        }

        // 🔍 MX record validation
        const isValidDomain = await validateEmailDomain(email);
        if (!isValidDomain) {
            return NextResponse.json(
                { success: false, message: "Invalid or unreachable email domain." },
                { status: 400 }
            );
        }

        // 📩 Email subject
        const subject = `New Inquiry from ${fullName} - ${department || "General"}`;

        // ✅ Send admin email
        await sendEmail({
            to,
            cc: ccList,
            subject,
            component: React.createElement(ContactNotification, {
                name,
                surname,
                email,
                phone,
                department,
                message,
            }),
            from: `"${fullName}" <${email}>`,
        });

        // ✅ Send user confirmation
        await sendEmail({
            to: email,
            subject: "We’ve received your message!",
            component: React.createElement(ContactConfirmation, {
                name,
                message,
                department,
            }),
        });

        // 💾 Save entry to WordPress
        await sendToWordPress({
            form_type: "contact",
            name: fullName,
            email,
            subject,
            message,
            to_email: `${to}${ccList ? ", " + ccList : ""}`,
            phone,
            department,
        });

        return NextResponse.json({
            success: true,
            message: "✅ Message sent and saved successfully.",
        });
    } catch (error: any) {
        console.error("❌ Error in /api/contact route:", error);

        if (error.name === "ZodError") {
            return NextResponse.json(
                { success: false, message: "Validation failed", errors: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, message: "Internal server error." },
            { status: 500 }
        );
    }
}
