import { Inter as FontSans } from "next/font/google"
import { cn } from "../../client/lib/utils"
import "./globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Code Racer",
  description: "Code Racer is a coding challenge platform that helps you learn Javascript and problem solving under pressure. Race against fellow coders in a quest to solve coding challenges the fastest. Start your engines and code your way to the finish line—may the quickest coder win!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html >
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
