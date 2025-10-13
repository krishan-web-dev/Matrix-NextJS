import { NextRequest } from "next/server";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Use Node.js runtime to support remote fetches & avoid SSL issues
export const runtime = "nodejs";


const WP_ORIGIN = process.env.NEXT_PUBLIC_WORDPRESS_URL!;

export async function GET(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    try {

        const { path } = await context.params;
        const relativePath = path.join("/");

        const wpUrl = `${WP_ORIGIN}/wp-content/uploads/${relativePath}`;
        console.log("Fetching from WP:", wpUrl);

        const upstream = await fetch(wpUrl);
        if (!upstream.ok) {
            console.error("Upstream failed:", upstream.status, upstream.statusText);
            return new Response("Image not found", { status: upstream.status });
        }

        const contentType = upstream.headers.get("content-type") ?? "image/jpeg";

        return new Response(upstream.body, {
            status: 200,
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "s-maxage=86400, stale-while-revalidate=86400",
            },
        });
    } catch (err) {
        console.error("Proxy error:", err);
        return new Response("Internal Server Error", { status: 500 });
    }
}
