"use client"

import Dashboard from "./dashboard/dashboard"
import { RacesCollectionProvider } from "@/lib/useRacesCollection"
import { AuthProvider } from "@/lib/useAuth"
import { User } from "@/lib/useAuth"


interface HomeProps {
  authenticatedUser: User | null;
}


export default function Home({ authenticatedUser }: HomeProps) {  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthProvider authenticatedUser={authenticatedUser}>
      <RacesCollectionProvider>
        <Dashboard />
      </RacesCollectionProvider>
      </AuthProvider>
    </main>
  )
}
