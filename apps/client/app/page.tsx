"use client"

import Dashboard from "./dashboard/dashboard"
import { RacesCollectionProvider } from "@/lib/useRacesCollection"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RacesCollectionProvider>
        <Dashboard />
      </RacesCollectionProvider>
    </main>
  )
}
