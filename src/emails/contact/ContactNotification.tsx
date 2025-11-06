import { Heading, Text } from "@react-email/components";
import BaseEmailLayout from "../layouts/BaseEmailLayout";

export default function ContactNotification({
    name,
    surname,
    email,
    phone,
    department,
    message,
}: any) {
    return (
        <BaseEmailLayout footerText="New contact form submission received.">
            <Heading>New Contact Submission</Heading>
            <Text><strong>Name:</strong> {name} {surname}</Text>
            <Text><strong>Email:</strong> {email}</Text>
            <Text><strong>Phone:</strong> {phone}</Text>
            <Text><strong>Department:</strong> {department}</Text>
            <Text><strong>Message:</strong></Text>
            <Text>{message}</Text>
        </BaseEmailLayout>
    );
}
