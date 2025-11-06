export async function sendToWordPress(data: Record<string, any>) {
    if (process.env.NODE_ENV === "development") {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/matrix-email/v1/submit`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.WP_API_KEY || "",
            },
            body: JSON.stringify(data),
        }
    );

    if (!res.ok) {
        console.warn("⚠️ WordPress API error:", await res.text());
    }

    return res.ok;
}
