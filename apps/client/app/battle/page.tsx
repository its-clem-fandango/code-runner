"use client"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import ChallengeDescription from "@/components/ChallengeDescription"
import { RaceProvider, useRace } from "@/lib/useRace"

const CodeEditor = dynamic(() => import("../../components/MonacoCodeEditor"))

export interface ChallengeData {
  challengeId: number
  name: string
  description: string
  difficultyOfChallenge: string
  example: string
  tests: any[]
}
export interface ConsoleData {
  clientId: string
  didAssertPass: boolean
  testResults: Array<TestResults>
}
export interface RaceData {
  id: number
  BattleName: string
  Difficulty: string
  Join: string
  Username: string
  clientId: string
  playerCount: number
  ChallengeId: number
}
export interface TestResults {
  name: string
  input: unknown
  expected: unknown
  result: unknown
  passed: boolean
  error?: TestError
}
export interface TestError {
  generatedMessage: boolean
  code: string
  acutal: string
  expected: string
  operator: string
}
export interface SyntaxError {
  message: string
}

function BattlePage() {
  const searchParams = useSearchParams()
  const battleId = parseInt(searchParams.get("id") as string)

  return (
    <RaceProvider>
      <div>
        <h1>Battle {battleId}</h1>
        <Battle battleId={battleId} />
      </div>
    </RaceProvider>
  )
}

function Battle({ battleId }: { battleId: number }) {
  const router = useRouter()
  const { race, sendRaceAction } = useRace()
  console.log({ race })
  const first = useRef(true)

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
      <div>
        <p>The Battle is already full</p>
        <Button onClick={() => router.back()}>Go back to Dashboard</Button>
      </div>
    )
  }

  return (
    <>
      <ChallengeDescription />
      <CodeEditor playerNumber={race.playerNumber} />
    </>
  )
}

export default BattlePage
