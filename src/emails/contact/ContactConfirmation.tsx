import { Heading, Text } from "@react-email/components";
import BaseEmailLayout from "../layouts/BaseEmailLayout";

export default function ContactConfirmation({ name, message, department }: any) {
    return (
        <BaseEmailLayout footerText="Thank you for contacting Matrix Systems.">
            <Heading>Hi {name}, we’ve received your message!</Heading>
            <Text>
                Thank you for contacting our {department || "support"} team. We’ll respond shortly.
            </Text>
            <Text><strong>Your message:</strong></Text>
            <Text>{message}</Text>
            <Text>Best regards,<br />The Matrix Systems Team</Text>
        </BaseEmailLayout>
    );
}
