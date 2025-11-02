import { Heading, Text } from "@react-email/components";
import { BaseEmailLayout } from "../shared/BaseEmailLayout";

export const ContactNotification = ({
    name,
    surname,
    email,
    phone,
    department,
    message,
}: {
    name: string;
    surname?: string;
    email: string;
    phone?: string;
    department?: string;
    message: string;
}) => (
    <BaseEmailLayout footerText="You received this contact form submission.">
        <Heading as="h2">New Contact Form Submission</Heading>
        <Text><strong>Name:</strong> {name} {surname || ""}</Text>
        <Text><strong>Email:</strong> {email}</Text>
        {phone && <Text><strong>Phone:</strong> {phone}</Text>}
        {department && <Text><strong>Department:</strong> {department}</Text>}
        <Text><strong>Message:</strong></Text>
        <Text>{message}</Text>
    </BaseEmailLayout>
);
