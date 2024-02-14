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
    <div className="bg-[#FAFAFA]">
      {/* <h1 className="text-2xl mx-14 mt-5">Battle {battleId}</h1> */}
      {isFull ? (
        <div>
          <p>The Battle is already full</p>
          <Button onClick={() => router.back()}>Go back to Dashboard</Button>
        </div>
      ) : (
        <>
          <div className="flex gap-5 mx-10 my-5">

            <div className="w-[50%] h-[90vh] bg-white rounded-lg border border-green-400">

              <h1 className="text-2xl font-bold p-4">Battle {battleId}</h1>
              <ChallengeDescription />

            </div>
            <div className="w-[50%] h-[90vh] bg-white rounded-lg border border-blue-400">
              <CodeEditor playerNumber={playerNumber} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Battle
