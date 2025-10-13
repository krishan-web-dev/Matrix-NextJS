import React from "react";

type Props = {
    tag?: "h2" | "h3" | "h4" | "h5" | "h6";
    className?: string;
    children: React.ReactNode;
};

export function DynamicHeading({ tag = "h2", className = "", children }: Props) {
    const Tag = tag;
    return <Tag className={className}>{children}</Tag>;
}
