import { Html, Head, Body, Container, Text, Hr } from "@react-email/components";

interface BaseEmailLayoutProps {
    children: React.ReactNode;
    footerText?: string;
}

export const BaseEmailLayout = ({ children, footerText }: BaseEmailLayoutProps) => (
    <Html>
        <Head />
        <Body
            style={{
                backgroundColor: "#f6f6f6",
                fontFamily: "Arial, sans-serif",
                margin: 0,
                padding: "20px",
            }}
        >
            <Container
                style={{
                    backgroundColor: "#ffffff",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                }}
            >
                {children}
                <Hr />
                <Text style={{ fontSize: "12px", color: "#999" }}>
                    {footerText || "This email was generated automatically by Matrix System Manager."}
                </Text>
            </Container>
        </Body>
    </Html>
);
