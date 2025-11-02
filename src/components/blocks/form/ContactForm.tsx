"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import clsx from "clsx";
//import "./contactform.scss";

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
    backgroundImage?: { node?: { sourceUrl?: string | null } | null } | null;
    disablePaddingTop?: boolean | null;
    disablePaddingBottom?: boolean | null;
    sectionId?: string | null;
    sectionClass?: string | null;
};

type FormValues = {
    name: string;
    surname: string;
    email: string;
    phone: string;
    department: string;
    message: string;
};

export default function ContactForm({
    title,
    titleSize,
    description,
    mainFormEmail,
    inquiryItem,
    background,
    backgroundImage,
    disablePaddingTop,
    disablePaddingBottom,
    sectionId,
    sectionClass,
}: ContactFormBlockProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();

    const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

    const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedInquiry = e.target.value;
        const match = inquiryItem?.find((item) => item.inquiry === selectedInquiry);
        setSelectedEmail(match?.email || null);
    };

    const onSubmit = async (data: FormValues) => {
        // 🧩 build payload with form data + recipient info
        const payload = {
            ...data,
            to: mainFormEmail,
            // support multiple comma-separated cc emails
            cc: selectedEmail ? selectedEmail.split(",").map((email) => email.trim()) : [],
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (result.success) {
                alert("✅ Message sent and saved successfully!");
                reset();
            } else {
                alert("❌ " + (result.message || "Failed to send message."));
            }
        } catch (error) {
            console.error("❌ Error submitting form:", error);
            alert("Something went wrong while sending your message.");
        }
    };


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

                <div className="row justify-content-md-center">
                    <div className="col-md-8">
                        <form
                            className="contact-form needs-validation"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="row gx-4">
                                <div className="col-md-6">
                                    <div className="form-floating mb-4">
                                        <input
                                            type="text"
                                            {...register("name", { required: "First name is required" })}
                                            placeholder="Jane"
                                            className="form-control"
                                        />
                                        <label htmlFor="form_name">First Name</label>
                                        {errors.name && (
                                            <small className="text-danger">{errors.name.message}</small>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-floating mb-4">
                                        <input
                                            type="text"
                                            {...register("surname", { required: "Last name is required" })}
                                            placeholder="Doe"
                                            className="form-control"
                                        />
                                        <label htmlFor="form_lastname">Last Name</label>
                                        {errors.surname && (
                                            <small className="text-danger">{errors.surname.message}</small>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-floating mb-4">
                                        <input
                                            type="email"
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: /^\S+@\S+$/i,
                                            })}
                                            placeholder="you@example.com"
                                            className="form-control"
                                        />
                                        <label>Email</label>
                                        {errors.email && (
                                            <small className="text-danger">{errors.email.message}</small>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-floating mb-4">
                                        <input
                                            type="tel"
                                            {...register("phone", {
                                                required: "Phone number is required",
                                                minLength: 6,
                                                maxLength: 15,
                                            })}
                                            placeholder="Your phone number"
                                            className="form-control"
                                        />
                                        <label>Phone Number</label>
                                        {errors.phone && (
                                            <small className="text-danger">{errors.phone.message}</small>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-select-wrapper mb-4">
                                        <select
                                            id="form-select"
                                            className="form-select"
                                            {...register("department", { required: true })}
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
                                            <small className="text-danger">Please select an inquiry</small>
                                        )}
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-floating mb-4">
                                        <textarea
                                            {...register("message", { required: true })}
                                            className="form-control"
                                            placeholder="Your message"
                                            style={{ height: 150 }}
                                        />
                                        <label>Message</label>
                                        {errors.message && (
                                            <small className="text-danger">Message is required</small>
                                        )}
                                    </div>
                                </div>

                                <div className="col-12 text-center">
                                    <input
                                        type="submit"
                                        value="Send message"
                                        className="btn btn-primary rounded-pill btn-send mb-3"
                                    />
                                </div>
                            </div>
                        </form>

                        <div className="text-center mt-4">
                            {mainFormEmail && (
                                <p className="text-muted">
                                    <small>Default recipient: {mainFormEmail}</small>
                                </p>
                            )}
                            {selectedEmail && (
                                <p className="text-muted">
                                    <small>CC: {selectedEmail}</small>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
