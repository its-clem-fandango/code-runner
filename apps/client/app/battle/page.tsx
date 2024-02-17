"use client"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { useRef } from "react"
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
  const { race } = useRace()

  return (
    <RaceProvider>
        <Battle battleId={battleId}/>
    </RaceProvider>
  )
}


function Battle({ battleId }: { battleId: number }) {
  const router = useRouter()
  const first = useRef(true)
  
  const { race } = useRace()
  console.log("race", race)
  const showBattle = race?.isFull && race?.playerCount >= 2

  console.log('is full: ', race?.isFull)
  console.log('HOW MANY PLAYERS: ', race?.playerCount)
  
  if (!showBattle) {
    return <Lobby battleId={battleId}/>
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
