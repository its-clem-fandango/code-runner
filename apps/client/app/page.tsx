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
  console.log("GITHUB USER OBJECT FROM SESSION CONTROLLER: ", user)
  console.log("IS LOGGED IN: ", isLoggedIn)

  return (
    <>
      <div className="bg-slate-900 py-4">
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
      </div>
      <RacesCollectionProvider>
        <main className="wrapper min-h-screen">
          {/* Dashboard content here */}
          <Dashboard />
        </main>
      </RacesCollectionProvider>
    </>
  )
}
