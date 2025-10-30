"use client";

import Image from "next/image";
import { wpToSeoPath } from "@/lib/utils/wpToSeoPath";
import "./team.scss";

type TeamMemberNode = {
    databaseId?: number | null;
    teamLayout?: {
        name?: string | null;
        designation?: string | null;
        description?: string | null;
        profilePicture?: {
            node?: {
                sourceUrl?: string | null;
                title?: string | null;
            } | null;
        } | null;
    } | null;
};

type TeamBlockProps = {
    title?: string | null;
    titleSize?: string | null;
    description?: string | null;
    columnCount?: string[] | null;
    members?: { nodes?: TeamMemberNode[] | null } | null;
    background?: string[] | null;
    backgroundImage?: { node?: { sourceUrl?: string | null } | null } | null;
    disablePaddingTop?: boolean | null;
    disablePaddingBottom?: boolean | null;
    sectionId?: string | null;
    sectionClass?: string | null;
};

export default function TeamBlock({
    title,
    titleSize,
    description,
    columnCount,
    members,
    background,
    backgroundImage,
    disablePaddingTop,
    disablePaddingBottom,
    sectionId,
    sectionClass,
}: TeamBlockProps) {

    const ptClass = disablePaddingTop ? "pt-0" : "pt-16";
    const pbClass = disablePaddingBottom ? "pb-0" : "pb-16";

    const bgStyle =
        backgroundImage?.node?.sourceUrl
            ? { backgroundImage: `url(${wpToSeoPath(backgroundImage.node.sourceUrl)})` }
            : background?.includes("bg_white")
                ? { backgroundColor: "#fff" }
                : {};

    // Grid layout logic based on ACF field
    const colClass =
        columnCount?.includes("col2")
            ? "col-md-6"
            : columnCount?.includes("col3")
                ? "col-md-4"
                : "col-md-3";

    return (
        <section
            id={sectionId ?? undefined}
            className={`team__members relative ${ptClass} ${pbClass} ${sectionClass ?? ""}`}
            style={bgStyle}
        >
            <div className="container">
                <div className="row mb-10 text-center">
                    <div className="col-md-12">
                        {title && (
                            <h2
                                className={
                                    titleSize === "h2"
                                        ? "text-3xl md:text-4xl font-bold"
                                        : titleSize === "h3"
                                            ? "text-2xl font-semibold"
                                            : "text-xl font-medium"
                                }
                            >
                                {title}
                            </h2>
                        )}
                        {description && (
                            <div
                                className="max-w-3xl mx-auto mt-4 text-muted-foreground"
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        )}
                    </div>
                </div>

                <div className="row">
                    {(members?.nodes ?? []).map((member) => {
                        const imgSrc = member.teamLayout?.profilePicture?.node?.sourceUrl
                            ? wpToSeoPath(member.teamLayout.profilePicture.node.sourceUrl)
                            : undefined;

                        return (
                            <div className={`${colClass} creative-team--block`} key={member.databaseId}>
                                <div className="inner-box">
                                    <div className="image-box">
                                        {imgSrc && (
                                            <figure className="image">
                                                <Image
                                                    src={imgSrc}
                                                    alt={member.teamLayout?.profilePicture?.node?.title || ""}
                                                    width={400}
                                                    height={400}
                                                    loading="lazy"
                                                    className="rounded-lg object-cover"
                                                />
                                            </figure>
                                        )}
                                        <div className="info-box">
                                            {member.teamLayout?.name && (
                                                <h4 className="name">{member.teamLayout.name}</h4>
                                            )}
                                            {member.teamLayout?.designation && (
                                                <span className="designation">
                                                    {member.teamLayout.designation}
                                                </span>
                                            )}
                                            {member.teamLayout?.description && (
                                                <p>{member.teamLayout.description}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
