import NodeCache from "node-cache";

const rateCache = new NodeCache({ stdTTL: 60 }); // 1-minute cache

export function rateLimit(ip: string, limit = 3): boolean {
    const key = `rate-${ip}`;
    const count = rateCache.get<number>(key) || 0;

    if (count >= limit) return false;

    rateCache.set(key, count + 1, 60);
    return true;
}
