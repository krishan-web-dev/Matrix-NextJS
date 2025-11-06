import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { sendEmail, rateLimit, validateEmailDomain, sendToWordPress } from "@/lib/utils";
import { ContactNotification, ContactConfirmation } from "@/emails";
import React from "react";

export async function POST(req: Request) {
    try {
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
        const ccList = Array.isArray(cc) ? cc.join(", ") : cc || "";

        if (!(await validateEmailDomain(email))) {
            return NextResponse.json(
                { success: false, message: "Invalid email domain." },
                { status: 400 }
            );
        }

        const subject = `New Inquiry from ${fullName} - ${department}`;

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

        await sendEmail({
            to: email,
            subject: "We’ve received your message!",
            component: React.createElement(ContactConfirmation, {
                name,
                message,
                department,
            }),
        });

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

        return NextResponse.json({ success: true, message: "✅ Message sent successfully" });
    } catch (error: any) {
        console.error("❌ Error in contact route:", error);
        if (error.name === "ZodError") {
            return NextResponse.json(
                { success: false, message: "Validation failed", errors: error.errors },
                { status: 400 }
            );
        }
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
