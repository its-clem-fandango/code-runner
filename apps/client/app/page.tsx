"use client"

import { cn } from "@/lib/utils"
import Dashboard from "./dashboard/dashboard"
import { RacesCollectionProvider } from "@/lib/useRacesCollection"
import CodeRacerLogo from "@/public/code-racer-logo.png"
import { Rowdies } from "next/font/google"
import Image from "next/image"
import { AuthProvider, useAuth } from "@/lib/useAuth"
import Login from "./login/page"
import UserAvatar from "./login/UserAvatar"

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
  console.log("GITHUB USER OBJECT: ", user)
  console.log("IS LOGGED IN: ", isLoggedIn)

  return (
    <>
      <div className="h-20 bg-slate-900 py-4 px-24 flex items-center justify-between text-white gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-full w-[40px] h-[40px] flex items-center justify-center">
            <Image
              src={CodeRacerLogo}
              width={24}
              height={24}
              alt="CodeRacer's logo"
            />
          </div>
          <span className={cn(rowdies.className, "uppercase text-2xl")}>
            Code Racer
          </span>
        </div>
        {isLoggedIn ? <UserAvatar /> : <Login />}
      </div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <RacesCollectionProvider>
          <Dashboard />
        </RacesCollectionProvider>
      </main>
    </>
  )
}
