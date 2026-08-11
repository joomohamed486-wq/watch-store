import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "وقت الذهب - متجر ساعات فاخرة",
    template: "%s | وقت الذهب",
  },
  description: "أفضل متجر ساعات فاخرة في المملكة العربية السعودية. تشكيلة واسعة من الساعات السويسرية الأصلية.",
  keywords: ["ساعات فاخرة", "رولكس", "أوميغا", "ساعات سويسرية", "متجر ساعات"],
  authors: [{ name: "وقت الذهب" }],
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "وقت الذهب",
    title: "وقت الذهب - متجر ساعات فاخرة",
    description: "أفضل متجر ساعات فاخرة في المملكة العربية السعودية",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
