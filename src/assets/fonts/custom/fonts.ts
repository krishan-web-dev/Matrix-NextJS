import localFont from "next/font/local";

export const OpinionPro = localFont({
  src: [
    {
      path: "./opinion-pro/OpinionPro-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./opinion-pro/OpinionPro-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
  ],
  variable: "--font-opinion-pro",
  display: "swap",
});

export const NeueHaas = localFont({
  src: [
    {
      path: "./neue-haas-grotesk/NeueHaasDisplay-Thin.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./neue-haas-grotesk/NeueHaasDisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./neue-haas-grotesk/NeueHaasDisplay-Roman.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-neue-haas",
  display: "swap",
});

export const PatriciaGothic = localFont({
  src: [
    {
      path: "./patricia-gothic/PatriciaGothic-Regular.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "./patricia-gothic/PatriciaGothic-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./patricia-gothic/PatriciaGothic-Bold.woff2",
      weight: "bold",
      style: "normal",
    },
  ],
  variable: "--font-patria-gothic",
  display: "swap",
});
