import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Nunito_Sans, Roboto, Open_Sans } from 'next/font/google'
import { OpinionPro, NeueHaas, PatriciaGothic } from "@/assets/fonts/custom/fonts";

import ThemeProvider from "theme/ThemeProvider";

import Progress from "components/Progress";
import ScrollCue from "components/ScrollCue";
import PageProgress from "components/common/PageProgress";

// ANIMATE CSS
import "animate.css";
// SWIPER CSS
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
// REACT VIDEO PLYR CSS
import "plyr-react/plyr.css";
// G-LIGHTBOX CSS
import "glightbox/dist/css/glightbox.css";
// SCROLL CUE CSS
import "plugins/scrollcue/scrollCue.css";
// BOOTSTRAP & CUSTOM CSS
import "assets/scss/style.scss";

import { ReactLenis } from '@/utils/lenis';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const nunito_sans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: '--font-roboto',
  display: 'swap',
})

const open_sans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Matrix (Pvt) Ltd. | Industrial & Engineering Solutions in Sri Lanka",
  description: "Matrix (Pvt) Ltd. offers 25+ years of expertise in industrial and engineering solutions, including compressed air systems, material handling, and turnkey services tailored to your business needs."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={[OpinionPro.variable, NeueHaas.variable, PatriciaGothic.variable, nunito_sans.variable, roboto.variable, open_sans.variable].join(' ')}>
      <body>
        <ReactLenis root>
          <ThemeProvider>{children}</ThemeProvider>
        </ReactLenis>

        {/* USED FOR SCROLL ANIMATION */}
        <ScrollCue />

        {/* USED FOR PAGE SCROLL PROGRESS BAR */}
        <PageProgress />

        {/* USED FOR PROGRESS BAR ANIMATE */}
        <Progress />
        <SpeedInsights />
      </body>
    </html>
  );
}
