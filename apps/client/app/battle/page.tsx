"use client"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import ChallengeDescription from "@/components/ChallengeDescription"
import { RaceProvider, useRace } from "@/lib/useRace"
import Lobby from "./lobby"

const CodeEditor = dynamic(() => import("../../components/MonacoCodeEditor"))

// TODO: put this in layout and remove component?
function BattlePage() {
  const searchParams = useSearchParams()
  const battleId = parseInt(searchParams.get("id") as string)
  return (
    <RaceProvider>
      <Battle battleId={battleId} />
    </RaceProvider>
  )
}

function Battle({ battleId }: { battleId: number }) {
  const router = useRouter()
  const first = useRef(true)
  const { race, sendRaceAction } = useRace()

  if (!race || !race.isFull) {
    return <Lobby />

  }
  useEffect(() => {
    if (!first.current) return
    if (sendRaceAction === undefined) return
    sendRaceAction("joinBattle", { id: battleId })
    first.current = false
  }, [sendRaceAction])

  if (race === null) {
    return <p>Loading...</p>
  }

  if (race?.isFull) {
    return (
      <div className="bg-[#FAFAFA] overflow-y-hidden h-[100vh]">
        <p>The Battle is already full</p>
        <Button onClick={() => router.push("/")}>Go back to Dashboard</Button>
      </div>
    )
  }

  return (
    <div className="bg-[#FAFAFA] h-[100vh]">
      <div className="flex gap-5 mx-10 my-5">
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

export default BattlePage
