import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { blockedDomains } from "@/lib/utils/blockedDomains";

export const contactSchema = z.object({
    name: z.string().min(2),
    surname: z.string().min(2),
    email: z
        .string()
        .email("Enter a valid email address")
        .refine(
            (val) => !blockedDomains.some((d) => val.toLowerCase().endsWith(d)),
            "Invalid or disposable email address"
        ),
    phone: z
        .string()
        .refine((val) => {
            const phone = parsePhoneNumberFromString(val || "");
            return phone?.isValid() ?? false;
        }, "Invalid phone number"),
    department: z.string().min(1, "Please select a department"),
    message: z.string().min(5, "Message must be at least 5 characters"),
    to: z.string().email(),
    cc: z.union([z.string(), z.array(z.string())]).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
