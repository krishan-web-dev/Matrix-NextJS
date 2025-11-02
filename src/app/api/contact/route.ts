import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const {
            name,
            surname,
            email,
            phone,
            department,
            message,
            to,
            cc,
        } = data;

        const fullName = [name, surname].filter(Boolean).join(" ");
        const ccList = Array.isArray(cc)
            ? cc.join(", ")
            : typeof cc === "string" && cc.includes(",")
                ? cc
                : cc
                    ? [cc].join(", ")
                    : "";

        if (!name || !email || !message || !to) {
            return NextResponse.json(
                { success: false, message: "Missing required fields." },
                { status: 400 }
            );
        }

        /**
         * 1️⃣ Setup SMTP Transporter
         * Make sure your .env.local credentials are correct!
         */
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        /**
         * 2️⃣ Prepare the Email
         */
        const subject = `New Inquiry from ${fullName} - ${department || "General"}`;
        const htmlBody = `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "-"}</p>
      <p><strong>Department:</strong> ${department || "-"}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `;

        /**
         * 3️⃣ Send the Email
         */
        console.log("📧 Attempting to send email via SMTP...");
        const mailInfo = await transporter.sendMail({
            from: `"${fullName}" <${email}>`,
            to,
            cc: ccList || undefined,
            subject,
            html: htmlBody,
        });
        console.log("✅ Email sent:", mailInfo.messageId);

        /**
         * 4️⃣ Send data to WordPress REST API for storage
         */
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

        const wpResult = await wpResponse.json().catch(() => ({}));

        if (!wpResponse.ok) {
            console.warn("⚠️ WordPress API error:", wpResult);
            return NextResponse.json(
                { success: false, message: "WordPress rejected the data." },
                { status: wpResponse.status }
            );
        }

        /**
         * 5️⃣ Return success
         */
        return NextResponse.json({
            success: true,
            message: "✅ Email sent and data stored in WordPress.",
            wpResult,
        });
    } catch (error: any) {
        console.error("❌ Error sending email:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Failed to send or save message." },
            { status: 500 }
        );
    }
}
