import type { Metadata } from "next";
import { Maven_Pro, Sora } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Footer from "../components/layout/Footer";
import { ConsentProvider } from "@/context/consent";
import CookieBanner from "@/components/common/PrivacyPolicyPrompt";

const mavenPro = Maven_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-body",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shrtly.melvinjonesrepol.com"),
  title: "Shrtly - Melvin Jones Repol",
  description:
    "Shrtly is a simple URL shortening service that allows you to create short links for your long URLs.",
  authors: [
    { name: "Melvin Jones Repol", url: "https://www.melvinjonesrepol.com" },
  ],
  alternates: {
    canonical: "https://shrtly.melvinjonesrepol.com",
  },
  openGraph: {
    title: "Shrtly - Melvin Jones Repol",
    description:
      "Shrtly is a simple URL shortening service that allows you to create short links for your long URLs.",
    url: "https://shrtly.melvinjonesrepol.com",
    siteName: "Shrtly",
    images: [
      {
        url: "https://shrtly.melvinjonesrepol.com/images/melvinjonesrepol.cover.png",
        width: 800,
        height: 600,
        alt: "Melvin Jones Repol",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shrtly - Melvin Jones Repol",
    description:
      "Shrtly is a simple URL shortening service that allows you to create short links for your long URLs.",
    images: [
      "https://shrtly.melvinjonesrepol.com/images/melvinjonesrepol.cover.png",
    ],
    creator: "@mrepol742",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        url: "/favicon-16x16.png",
        sizes: "16x16",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${mavenPro.variable} ${sora.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <meta name="hostname" content="shrtly.melvinjonesrepol.com" />
      </head>
      <body className="antialiased">
        <ConsentProvider>
          <CookieBanner />
          <div className="min-h-screen bg-[#f7f9f7] text-[#17211b]">
            {children}

            <Footer />
          </div>

          <ToastContainer />
        </ConsentProvider>
      </body>
    </html>
  );
}
