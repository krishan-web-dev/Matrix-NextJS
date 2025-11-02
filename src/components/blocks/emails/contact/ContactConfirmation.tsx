import { Heading, Text } from "@react-email/components";
import { BaseEmailLayout } from "../shared/BaseEmailLayout";

export const ContactConfirmation = ({
    name,
    message,
    department,
}: {
    name: string;
    message: string;
    department?: string;
}) => (
    <BaseEmailLayout footerText="Thank you for reaching out to Matrix Systems.">
        <Heading as="h2">Hi {name}, we’ve received your message!</Heading>
        <Text>
            Thank you for contacting our {department || "support"} team. We’ll respond shortly.
        </Text>
        <Text><strong>Your message:</strong></Text>
        <Text>{message}</Text>
        <Text>Best regards,<br />The Matrix Team</Text>
    </BaseEmailLayout>
);
