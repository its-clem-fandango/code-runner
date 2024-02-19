import { Inter as FontSans } from "next/font/google"
import { cn } from "../../client/lib/utils"
import "./globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  )
}
