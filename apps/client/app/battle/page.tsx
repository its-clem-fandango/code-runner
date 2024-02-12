"use client"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import ChallengeDescription from "@/components/ChallengeDescription"

const CodeEditor = dynamic(() => import("../../components/ui/MonacoCodeEditor"))

function Battle() {
  const [isFull, setIsFull] = useState<boolean>(false)
  const [playerNumber, setPlayerNumber] = useState<number | null>(null)
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
    function handleJoinedBattle(msg: {
      id: number
      playerCount: number
      clientId: string
    }) {
      console.log(socket.id)
      if (msg.clientId === socket.id) setPlayerNumber(msg.playerCount)
    }

    socket.on("battleError", handleBattleError)
    socket.on("joinedBattle", handleJoinedBattle)

    setUpRef.current = true
  }, [])

  return (
    <div>
      <h1>Battle {battleId}</h1>
      {isFull ? (
        <div>
          <p>The Battle is already full</p>
          <Button onClick={() => router.back()}>Go back to Dashboard</Button>
        </div>
      ) : (
        <>
          <ChallengeDescription />
          <CodeEditor playerNumber={playerNumber} />
        </>
      )}
    </div>
  )
}

export default Battle
