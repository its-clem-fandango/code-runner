"use client"

// FE Login --> redirects to /auth/github in AUTH.CONTROLLER
// auth/github --> sends client Id and secret key to GH and redirects user to GH
// github.com --> user authorizes and github redirects to callback URL
// auth/github/callback --> receives GH access token,
// --> then sends clientId, secretkey and token to GH to get user's profile
// auth/github/callback --> calls users.service to find or create profile
// then creates a session with a userID
// This sets a cookie called sessionId and redirects the user to dashboard

import { cn } from "@/lib/utils"
import Dashboard from "./dashboard/dashboard"
import { RacesCollectionProvider } from "@/lib/useRacesCollection"
import CodeRacerLogo from "@/public/code-racer-logo.png"
import { Rowdies } from "next/font/google"
import Image from "next/image"
import { AuthProvider, useAuth } from "@/lib/useAuth"
import Login from "./login/page"
import UserAvatar from "./login/UserAvatar"
import { Analytics } from "@vercel/analytics/react"

const rowdies = Rowdies({
  weight: ["400"],
  subsets: ["latin"],
})

export default function Home() {
  return (
    <AuthProvider>
      <HomeContent />
    </AuthProvider>
  )
}
function HomeContent() {
  const { user, isLoggedIn } = useAuth()

  return (
    <>
      <header className="bg-slate-900 py-4">
        <div className="wrapper flex items-center justify-between text-white gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-full w-[40px] h-[40px] flex items-center justify-center gap-4 ">
              <Image
                src={CodeRacerLogo}
                width={24}
                height={24}
                alt="Code Racer's logo"
              />
            </div>
            <span className={cn(rowdies.className, "uppercase text-2xl")}>
              Code Racer
            </span>
          </div>
          {isLoggedIn ? <UserAvatar /> : <Login />}
        </div>
      </header>
      <RacesCollectionProvider>
        <main className="wrapper min-h-screen">
          {/* Dashboard content here */}
          <Dashboard />
        </main>
      </RacesCollectionProvider>
      <Analytics />
    </>
  )
}
