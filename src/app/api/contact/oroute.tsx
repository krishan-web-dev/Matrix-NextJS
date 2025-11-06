import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/utils/emailHelpers";
import { ContactNotification } from "@/components/blocks/emails/contact/ContactNotification";
import { ContactConfirmation } from "@/components/blocks/emails/contact/ContactConfirmation";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { name, surname, email, phone, department, message, to, cc } = data;

        const fullName = [name, surname].filter(Boolean).join(" ");
        const ccList =
            Array.isArray(cc) ? cc.join(", ")
                : typeof cc === "string" && cc.includes(",") ? cc
                    : cc ? [cc].join(", ")
                        : "";

        if (!name || !email || !message || !to) {
            return NextResponse.json(
                { success: false, message: "Missing required fields." },
                { status: 400 }
            );
        }

        const subject = `New Inquiry from ${fullName} - ${department || "General"}`;

        // Admin notification
        await sendEmail({
            to,
            cc: ccList,
            subject,
            component: (
                <ContactNotification
          name= { name }
          surname={ surname }
          email={ email }
          phone={ phone }
          department={ department }
          message={ message }
            />
      ),
            from: `"${fullName}" <${email}>`,
    });

    // User confirmation
    await sendEmail({
        to: email,
        subject: "We’ve received your message!",
        component: (
            <ContactConfirmation
          name= { name }
          message={ message }
          department={ department }
        />
      ),
    });

// Send to WordPress
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

const wpResult = await wpResponse.json().catch(() => ({}));
if (!wpResponse.ok) {
    console.warn("⚠️ WordPress API error:", wpResult);
}

return NextResponse.json({
    success: true,
    message: "✅ Emails sent and data stored successfully.",
    wpResult,
});
  } catch (error: any) {
    console.error("❌ Error in contact route:", error);
    return NextResponse.json(
        { success: false, message: error.message || "Failed to send or save message." },
        { status: 500 }
    );
}
}
