import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const contactSchema = z.object({
    name: z.string().min(2, "Name too short"),
    surname: z.string().min(2, "Surname too short"),
    email: z
        .string()
        .email("Invalid email")
        .refine(
            (val) =>
                !["example.com", "test.com", "mailinator.com", "tempmail.com"].some((d) =>
                    val.toLowerCase().endsWith(d)
                ),
            "Disposable email not allowed"
        ),
    phone: z
        .string()
        .refine((v) => {
            const phone = parsePhoneNumberFromString(v || "");
            return phone?.isValid() ?? false;
        }, "Invalid phone number")
        .refine((v) => !/[,;/]/.test(v || ""), "Only one phone number allowed"),
    department: z.string().min(1, "Department required"),
    message: z.string().min(5, "Message too short"),
    to: z.string().email(),
    cc: z.union([z.string(), z.array(z.string())]).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
