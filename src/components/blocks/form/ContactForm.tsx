"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import clsx from "clsx";
import toast from "react-hot-toast";

type InquiryItem = {
    inquiry?: string | null;
    email?: string | null;
};

type ContactFormBlockProps = {
    titleSize?: string | null;
    title?: string | null;
    description?: string | null;
    mainFormEmail?: string | null;
    inquiryItem?: InquiryItem[] | null;
    background?: string[] | null;
    disablePaddingTop?: boolean | null;
    disablePaddingBottom?: boolean | null;
    sectionId?: string | null;
    sectionClass?: string | null;
};

// ✅ Zod validation schema
const ContactFormSchema = z.object({
    name: z.string().min(2, "First name must be at least 2 characters"),
    surname: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    phone: z
        .string()
        .refine((val) => isValidPhoneNumber(val || ""), {
            message: "Enter a valid phone number",
        }),
    department: z.string().min(1, "Please select an inquiry"),
    message: z.string().min(5, "Message must be at least 5 characters"),
});

type FormValues = z.infer<typeof ContactFormSchema>;

export default function ContactForm({
    title,
    titleSize,
    description,
    mainFormEmail,
    inquiryItem,
    background,
    disablePaddingTop,
    disablePaddingBottom,
    sectionId,
    sectionClass,
}: ContactFormBlockProps) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(ContactFormSchema),
    });

    const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
    const [countryCode, setCountryCode] = useState<string>("LK"); // default fallback
    const [loadingCountry, setLoadingCountry] = useState<boolean>(true);

    // 🌍 Detect country by IP, fallback to browser locale
    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const res = await fetch("https://ipapi.co/json/");
                if (res.ok) {
                    const data = await res.json();
                    if (data.country) {
                        setCountryCode(data.country);
                        setLoadingCountry(false);
                        return;
                    }
                }
            } catch {
                console.warn("IP lookup failed, falling back to browser locale.");
            }

            // Fallback: browser locale
            try {
                const locale = Intl.DateTimeFormat().resolvedOptions().locale;
                const code = locale.split("-")[1]?.toUpperCase();
                if (code) setCountryCode(code);
            } catch {
                console.warn("Could not determine locale, using default LK.");
            }
            setLoadingCountry(false);
        };

        fetchCountry();
    }, []);

    const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedInquiry = e.target.value;
        const match = inquiryItem?.find((item) => item.inquiry === selectedInquiry);
        setSelectedEmail(match?.email || null);
    };

    const onSubmit = async (data: FormValues) => {
        const payload = {
            ...data,
            to: mainFormEmail,
            cc: selectedEmail ? selectedEmail.split(",").map((e) => e.trim()) : [],
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (result.success) {
                toast.success("✅ Message sent successfully!");
                reset();
            } else {
                toast.error(result.message || "❌ Failed to send message.");
            }
        } catch (error) {
            console.error("❌ Error submitting form:", error);
            toast.error("Something went wrong while sending your message.");
        }
    };

    // Layout helpers
    const ptClass = disablePaddingTop ? "pt-0" : "pt-16";
    const pbClass = disablePaddingBottom ? "pb-0" : "pb-16";
    const bgClass = background?.includes("bg_white")
        ? "bg-white"
        : background?.includes("bg_soft_primary")
            ? "bg-soft-primary"
            : "";

    return (
        <section
            id={sectionId ?? undefined}
            className={clsx("wrapper", bgClass, ptClass, pbClass, sectionClass)}
        >
            <div className="container">
                {/* Heading */}
                <div className="row justify-content-md-center mb-12">
                    <div className="col-md-8 text-center">
                        {title && (
                            <h2
                                className={clsx(
                                    titleSize === "h2"
                                        ? "text-3xl font-bold"
                                        : titleSize === "h3"
                                            ? "text-2xl font-semibold"
                                            : "text-xl font-medium"
                                )}
                            >
                                {title}
                            </h2>
                        )}
                        {description && (
                            <div
                                className="mt-4 text-muted"
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        )}
                    </div>
                </div>

                {/* Form */}
                <div className="row justify-content-md-center">
                    <div className="col-md-8">
                        <form
                            className="contact-form needs-validation"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="row gx-4">
                                {/* First Name */}
                                <div className="col-md-6">
                                    <div className="form-floating mb-4">
                                        <input
                                            type="text"
                                            {...register("name")}
                                            placeholder="Jane"
                                            className="form-control"
                                        />
                                        <label>First Name</label>
                                        {errors.name && (
                                            <small className="text-danger">{errors.name.message}</small>
                                        )}
                                    </div>
                                </div>

                                {/* Last Name */}
                                <div className="col-md-6">
                                    <div className="form-floating mb-4">
                                        <input
                                            type="text"
                                            {...register("surname")}
                                            placeholder="Doe"
                                            className="form-control"
                                        />
                                        <label>Last Name</label>
                                        {errors.surname && (
                                            <small className="text-danger">{errors.surname.message}</small>
                                        )}
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="col-md-6">
                                    <div className="form-floating mb-4">
                                        <input
                                            type="email"
                                            {...register("email")}
                                            placeholder="you@example.com"
                                            className="form-control"
                                        />
                                        <label>Email</label>
                                        {errors.email && (
                                            <small className="text-danger">{errors.email.message}</small>
                                        )}
                                    </div>
                                </div>

                                {/* Phone (with auto-detected country + override) */}
                                <div className="col-md-6">
                                    <div className="form-floating mb-4">
                                        {loadingCountry ? (
                                            <div className="text-muted small">Detecting country…</div>
                                        ) : (
                                            <Controller
                                                name="phone"
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <PhoneInput
                                                        international
                                                        defaultCountry={countryCode as any}
                                                        value={value}
                                                        onChange={onChange}
                                                        className={`form-control p-2 ${errors.phone ? "border-danger" : ""
                                                            }`}
                                                        placeholder="Enter phone number"
                                                    />
                                                )}
                                            />
                                        )}
                                        <label>Phone Number</label>
                                        {errors.phone && (
                                            <small className="text-danger">{errors.phone.message}</small>
                                        )}
                                    </div>
                                </div>

                                {/* Department */}
                                <div className="col-md-6">
                                    <div className="form-select-wrapper mb-4">
                                        <select
                                            id="form-select"
                                            className="form-select"
                                            {...register("department")}
                                            onChange={handleDepartmentChange}
                                        >
                                            <option value="">Select an inquiry type</option>
                                            {(inquiryItem ?? []).map((item, i) => (
                                                <option key={i} value={item.inquiry || ""}>
                                                    {item.inquiry}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.department && (
                                            <small className="text-danger">
                                                {errors.department.message}
                                            </small>
                                        )}
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="col-12">
                                    <div className="form-floating mb-4">
                                        <textarea
                                            {...register("message")}
                                            className="form-control"
                                            placeholder="Your message"
                                            style={{ height: 150 }}
                                        />
                                        <label>Message</label>
                                        {errors.message && (
                                            <small className="text-danger">{errors.message.message}</small>
                                        )}
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="col-12 text-center">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn btn-primary rounded-pill btn-send mb-3"
                                    >
                                        {isSubmitting ? "Sending..." : "Send message"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
