/**
 * Convert a WordPress media URL to a local SEO-friendly proxy path.
 * Example:
 *   https://app.wps/wp-content/uploads/2025/09/image.jpg
 * → /images/2025/09/image.jpg
 *
 * Works with Next.js `app/images/[...path]/route.ts` proxy.
 */
export function wpToSeoPath(url?: string | null): string | undefined {
    if (!url) return undefined;

    const parts = url.split("/wp-content/uploads/");
    if (parts.length < 2) return url; // fallback for non-standard URLs

    return `/images/${parts[1]}`;
}
