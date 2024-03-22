"use client"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import ChallengeDescription from "@/components/ChallengeDescription"
import { RaceProvider, useRace } from "@/lib/useRace"
import Lobby from "./Lobby"
import { Suspense } from "react"

const CodeEditor = dynamic(() => import("../../components/MonacoCodeEditor"))

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BattlePage />
    </Suspense>
  )
}

// TODO: put this in layout and remove component?
function BattlePage() {
  return (
    <RaceProvider>
      <Suspense>
        <Battle />
      </Suspense>
    </RaceProvider>
  )
}

function Battle({ battleId }: { battleId: number } = { battleId: -1 }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const battleId = parseInt(searchParams.get("id") as string)

  const { race } = useRace()
  const showBattle = race?.isFull && race?.playerCount >= 2

  if (!showBattle) {
    return <Lobby battleId={battleId} />
  }
  if (race?.playerCount > 2) {
    return (
      <div className="bg-[#FAFAFA] overflow-y-hidden h-[100vh]">
        <p>The Battle is already full</p>
        <Button onClick={() => router.push("/")}>Go back to Dashboard</Button>
      </div>
    )
  }

  return (
    <div className="bg-[#FAFAFA] h-[100vh]">
      <div className="flex gap-5 mx-10 py-5">
        <ChallengeDescription />
        <div className="w-[50%] h-[90vh] bg-white rounded-lg ">
          <CodeEditor
            playerNumber={race.playerCount}
            challengeId={race.challengeId}
          />
        </div>
      </div>
    </div>
  )
}

export default Page
