"use client"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const CodeEditor = dynamic(() => import("../../components/ui/MonacoCodeEditor"))

function Battle() {
  const [isFull, setIsFull] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const battleId = parseInt(searchParams.get("id") as string)
  const socket = io("ws://localhost:8082")

  useEffect(() => {
    socket.emit("joinBattle", { id: battleId })
    socket.on("battleError", (msg) => {
      if (msg.full === true) setIsFull(true)
    })
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
        <CodeEditor />
      )}
    </div>
  )
}

export default Battle
