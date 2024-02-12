"use client"

import { Toggle } from "@/components/ui/toggle"
import { useState } from "react"

export default function Lobby() {
  const [ready, setReady] = useState(true)
  const [waitingMessage, setWaitingMessage] = useState("")

  function handleReadySubmit() {
    setReady((prevReady) => !prevReady)
    console.log("Toggled to: ", !ready)
  }

  return (
    <>
      <h1>Waiting for other players to join...</h1>
      <Toggle
        variant="outline"
        aria-label="Toggle italic"
        size="lg"
        onClick={handleReadySubmit}
      >
        {ready ? "Ready" : "Not Ready"}
      </Toggle>
    </>
  )
}
