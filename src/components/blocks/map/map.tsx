"use client";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { wpToSeoPath } from "@/lib/utils/wpToSeoPath";
import clsx from "clsx";
import "./map.scss";

type MapData = {
    latitude?: number | string | null;
    longitude?: number | string | null;
    zoom?: number | string | null;
};

type TelephoneField = {
    areaCode?: string | null | number;
    telephone?: string | null | number;
};

type EmailField = {
    email?: string | null;
};

type MapBlockProps = {
    address?: string | null;
    telephone?: TelephoneField[] | null;
    email?: EmailField[] | null;
    map?: MapData | null;
    mapMarker?: { node?: { sourceUrl?: string | null; title?: string | null } | null } | null;
    background?: string[] | null;
    backgroundImage?: { node?: { sourceUrl?: string | null } | null } | null;
    sectionId?: string | null;
    sectionClass?: string | null;
};

export default function MapBlock({
    address,
    telephone,
    email,
    map,
    mapMarker,
    background,
    backgroundImage,
    sectionId,
    sectionClass,
}: MapBlockProps) {
    console.log("🟢 Apollo data:", {
        address,
        telephone,
        email,
        map,
        mapMarker,
    });

    // ✅ Parse numeric values
    const lat = map?.latitude ? parseFloat(String(map.latitude)) : 6.9271;
    const lng = map?.longitude ? parseFloat(String(map.longitude)) : 79.8612;
    const zoom = map?.zoom ? parseInt(String(map.zoom), 10) : 12;
    const center = { lat, lng };

    // ✅ Background
    const bgStyle =
        backgroundImage?.node?.sourceUrl
            ? { backgroundImage: `url(${wpToSeoPath(backgroundImage.node.sourceUrl)})` }
            : background?.includes("bg_soft_primary")
                ? { backgroundColor: "#f8f9fa" }
                : {};

    // ✅ Custom Marker
    const markerIcon = mapMarker?.node?.sourceUrl
        ? wpToSeoPath(mapMarker.node.sourceUrl)
        : "/images/default-marker.png";

    // ✅ Map ID: sectionId or fallback
    const mapId = sectionId || "our-location";

    return (
        <section
            id={sectionId ?? undefined}
            className={clsx("wrapper", sectionClass)}
            style={bgStyle}
        >
            <div className="container pb-11">
                <div className="row mb-14 mb-md-16">
                    <div className="col-xl-10 mx-auto">
                        <div className="card">
                            <div className="row gx-0">
                                {/* Google Map Section */}
                                <div className="col-lg-6 align-self-stretch">
                                    <div className="map map-full rounded-top rounded-lg-start">
                                        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
                                            <Map
                                                mapId={mapId}
                                                defaultZoom={zoom}
                                                defaultCenter={center}
                                                gestureHandling="greedy"
                                                disableDefaultUI={false}
                                                style={{ width: "100%", height: "100%" }}
                                            >
                                                <AdvancedMarker position={center}>
                                                    <div className="map-marker">
                                                        <span className="pulse"></span>
                                                        <img
                                                            src={markerIcon}
                                                            alt={mapMarker?.node?.title || "Map Marker"}
                                                            style={{ width: 50, height: 50 }}
                                                        />
                                                    </div>
                                                </AdvancedMarker>
                                            </Map>
                                        </APIProvider>
                                    </div>
                                </div>

                                {/* Contact Info Section */}
                                <div className="col-lg-6">
                                    <div className="p-10 p-md-11 p-lg-14">
                                        {/* Address */}
                                        {address && (
                                            <div className="d-flex flex-row mb-4">
                                                <div className="icon text-primary fs-28 me-4 mt-n1">
                                                    <i className="uil uil-location-pin-alt" />
                                                </div>
                                                <div>
                                                    <h5 className="mb-1">Address</h5>
                                                    <address dangerouslySetInnerHTML={{ __html: address.replace(/\r?\n/g, "<br />") }} />
                                                </div>
                                            </div>
                                        )}

                                        {/* Telephone */}
                                        {telephone && telephone.length > 0 && (
                                            <div className="d-flex flex-row mb-4">
                                                <div className="icon text-primary fs-28 me-4 mt-n1">
                                                    <i className="uil uil-phone-volume" />
                                                </div>
                                                <div>
                                                    <h5 className="mb-1">Phone</h5>
                                                    {telephone.map((t, i) => {
                                                        const display = [t.areaCode, t.telephone]
                                                            .filter(Boolean)
                                                            .join(" ");
                                                        const href = t.telephone
                                                            ? `tel:${t.areaCode ? `${t.areaCode}-${t.telephone}` : t.telephone}`
                                                            : null;
                                                        return (
                                                            <p key={i} className="mb-0">
                                                                {href ? (
                                                                    <a href={href} className="link-body">
                                                                        {display}
                                                                    </a>
                                                                ) : (
                                                                    display
                                                                )}
                                                            </p>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* Email */}
                                        {email && email.length > 0 && (
                                            <div className="d-flex flex-row">
                                                <div className="icon text-primary fs-28 me-4 mt-n1">
                                                    <i className="uil uil-envelope" />
                                                </div>
                                                <div>
                                                    <h5 className="mb-1">E-mail</h5>
                                                    {email.map((e, i) =>
                                                        e.email ? (
                                                            <p key={i} className="mb-0">
                                                                <a
                                                                    href={`mailto:${e.email}`}
                                                                    className="link-body"
                                                                >
                                                                    {e.email}
                                                                </a>
                                                            </p>
                                                        ) : null
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
