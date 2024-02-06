import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "../../client/lib/utils";
import "./globals.css";

/* const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
 */

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Code Racer",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )} >
        {children}
      </body>
    </html>
  );
}
