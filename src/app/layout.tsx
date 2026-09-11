import type { Metadata } from "next";
import { Source_Code_Pro, Maven_Pro } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-heading",
});

const mavenPro = Maven_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-body",
});

export const revalidate = 43200; // 12 hours (in seconds)

export const metadata: Metadata = {
  title: "Shrtly - Shorten any URL Instantly!",
  description:
    "Shrtly is a simple URL shortening service that allows you to create short links for your long URLs.",
  keywords: ["url", "shortener", "link", "shortlink", "shrtly"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceCodePro.variable} ${mavenPro.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <meta name="hostname" content="shrtly.melvinjonesrepol.com" />
        <link rel="canonical" href="https://shrtly.melvinjonesrepol.com" />
      </head>
      <body className="antialiased">
        <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
          {children}

          <Footer />
        </div>

        <ToastContainer />
      </body>
    </html>
  );
}
