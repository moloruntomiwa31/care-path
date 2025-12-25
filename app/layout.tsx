import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import QueryProvider from "@/components/providers/QueryProvider";
import "./globals.css";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "CarePath - Your Complete Healthcare Companion",
  description: "Find nearby hospitals, manage appointment queues, and validate medications with AI. Your all-in-one healthcare platform for better health management.",
  keywords: ["hospital finder", "healthcare", "drug validator", "queue manager", "medical appointments", "AI health"],
  authors: [{ name: "CarePath Team" }],
  creator: "CarePath",
  publisher: "CarePath",
  openGraph: {
    title: "CarePath - Your Complete Healthcare Companion",
    description: "Find nearby hospitals, manage appointment queues, and validate medications with AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ubuntu.variable} antialiased`}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
