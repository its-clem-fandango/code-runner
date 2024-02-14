"use client"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import ChallengeDescription from "@/components/ChallengeDescription"
import ChallengeConsole from "@/components/ChallengeConsole"

import apicalls from "@/helper/apicalls"

const CodeEditor = dynamic(() => import("../../components/MonacoCodeEditor"))

export interface ChallengeData {
  challengeId: number
  name: string
  description: string
  difficultyOfChallenge: string
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

function Battle() {
  const [isFull, setIsFull] = useState<boolean>(false)
  const [raceData, setRaceData] = useState<RaceData | null>(null)
  const [challengeData, setChallengeData] = useState<ChallengeData | null>(null)
  const [consoleData, setConsoleData] = useState<ConsoleData | null>(null)
  const [syntaxError, setSyntaxError] = useState<string | null>(null)
  const [showDescription, setShowDescription] = useState<boolean>(true)
  const [showConsole, setShowConsole] = useState<boolean>(false)
  const [playerNumber, setPlayerNumber] = useState<number | null>(null)
  const [challengeId, setChallengeId] = useState<number | null>(null)
  const setUpRef = useRef(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const battleId = parseInt(searchParams.get("id") as string)
  const socket = io("ws://localhost:8082")

  useEffect(() => {
    if (setUpRef.current) return
    socket.emit("joinBattle", { id: battleId })

    function handleBattleError(msg: { full: boolean }) {
      if (msg.full === true) setIsFull(true)
    }
    async function handleJoinedBattle(msg: {
      id: number
      BattleName: string
      Difficulty: string
      Join: string
      Username: string
      clientId: string
      playerCount: number
      ChallengeId: number
    }) {
      console.log(msg)
      if (msg.clientId === socket.id) setPlayerNumber(msg.playerCount)
      setRaceData(msg)
      setChallengeId(msg.ChallengeId)
      setChallengeData(await apicalls.getChallangeData(msg.ChallengeId))
      console.log(challengeData)
    }

    socket.on("battleError", handleBattleError)
    socket.on("joinedBattle", handleJoinedBattle)

    setUpRef.current = true
  }, [])
  function handleTestResults(testResults: ConsoleData) {
    setConsoleData(testResults)
  }
  function handleSyntaxError(testResults: SyntaxError | null) {
    if (testResults?.message) {
      setSyntaxError(testResults.message)
    } else setSyntaxError(null)
  }

  return (
    <div>
      <h1>{raceData ? raceData.BattleName : null}</h1>
      {isFull ? (
        <div>
          <p>The Battle is already full</p>
          <Button onClick={() => router.back()}>Go back to Dashboard</Button>
        </div>
      ) : (
        <>
          <Button
            onClick={() => {
              setShowConsole(false)
              setShowDescription(true)
            }}
          >
            Description
          </Button>
          <Button
            onClick={() => {
              setShowDescription(false)
              setShowConsole(true)
            }}
          >
            Console
          </Button>
          {showDescription ? (
            <ChallengeDescription data={challengeData} />
          ) : null}
          {showConsole ? (
            <ChallengeConsole
              consoleData={consoleData}
              syntaxError={syntaxError}
            />
          ) : null}
          <CodeEditor
            playerNumber={playerNumber}
            challengeId={challengeId}
            handleResults={handleTestResults}
            handleSyntaxError={handleSyntaxError}
          />
        </>
      )}
    </div>
  )
}

export default Battle
