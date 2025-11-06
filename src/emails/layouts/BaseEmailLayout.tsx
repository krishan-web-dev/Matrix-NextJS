import { Html, Head, Body, Container, Text, Hr } from "@react-email/components";

export default function BaseEmailLayout({
    children,
    footerText,
}: {
    children: React.ReactNode;
    footerText?: string;
}) {
    return (
        <Html>
            <Head />
            <Body style={{ backgroundColor: "#f6f6f6", fontFamily: "Arial, sans-serif", margin: 0, padding: "20px" }}>
                <Container style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px" }}>
                    {children}
                    <Hr />
                    <Text style={{ fontSize: "12px", color: "#999" }}>
                        {footerText || "This email was generated automatically by Matrix Systems."}
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}
