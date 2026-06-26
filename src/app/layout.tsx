import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Devanagari, Playfair_Display } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "@/styles.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-marathi",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "श्री श्रीरंग आप्पा बारणे — खासदार, मावळ लोकसभा मतदारसंघ",
  description:
    "Shri Shrirang Appa Barne — Three-time Member of Parliament from Maval Lok Sabha constituency. Sansad Ratna awardee committed to inclusive development.",
  keywords: [
    "Shrirang Barne",
    "Maval MP",
    "Member of Parliament",
    "Pimpri Chinchwad",
    "Lok Sabha",
    "Sansad Ratna",
  ],
  openGraph: {
    title: "Shri Shrirang Appa Barne — Member of Parliament, Maval",
    description: "Three-time MP committed to the holistic development of Maval constituency.",
    type: "website",
    url: "/",
    siteName: "Shrirang Appa Barne",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/images/logo.webp",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a2754",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${notoDevanagari.variable} ${playfair.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
