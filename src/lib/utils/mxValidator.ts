import dns from "dns/promises";

export async function validateEmailDomain(email: string): Promise<boolean> {
    const domain = email.split("@")[1];
    if (!domain) return false;

    try {
        const records = await dns.resolveMx(domain);
        return records && records.length > 0;
    } catch {
        return false;
    }
}
