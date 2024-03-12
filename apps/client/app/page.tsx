"use client"

import Dashboard from "./dashboard/dashboard"
import { RacesCollectionProvider } from "@/lib/useRacesCollection"
import { AuthProvider } from "@/lib/useAuth"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthProvider>
      <RacesCollectionProvider>
        <Dashboard />
      </RacesCollectionProvider>
      </AuthProvider>
    </main>
  )
}
