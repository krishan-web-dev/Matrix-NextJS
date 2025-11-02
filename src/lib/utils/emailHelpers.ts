import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import type { ReactElement } from "react";

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendEmail({
    to,
    subject,
    component,
    cc,
    from,
}: {
    to: string;
    subject: string;
    component: ReactElement;
    cc?: string;
    from?: string;
}) {
    // 🔥 FIX: Await the render() result
    const html = await render(component);

    const info = await transporter.sendMail({
        from: from || `"Matrix Systems" <${process.env.SMTP_USER}>`,
        to,
        cc,
        subject,
        html,
    });

    console.log(`📨 Email sent → ${subject} (${info.messageId})`);
    return info;
}
