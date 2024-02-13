"use client"

import { Toggle } from "@/components/ui/toggle"
import { useEffect, useState } from "react"
import { socket } from "@/components/ui/socket"

export default function Lobby() {
  const [isPlayerReady, setisPlayerReady] = useState(true)
  const [numOfPlayers, setNumOfPlayers] = useState(null)
  const [isGameReady, setIsGameReady] = useState(false)
  const [waitingMessage, setWaitingMessage] = useState("")

  useEffect(() => {
    socket.on("isGameReady", (data) => {
      setIsGameReady(true)
      setNumOfPlayers(data.numOfPlayers)
    })
    return () => {
      socket.off("isGameReady")
    }
  }, [])

  function handleReadySubmit() {
    setisPlayerReady((prevReady) => !prevReady)
    console.log("Toggled to: ", !isPlayerReady)
  }

  //if new player joins --> Means I need to recieve something from the backend. what?
  //and is ready
  //render the new-game

  return (
    <>
      <h1>Waiting for other players to join...</h1>
      <Toggle
        variant="outline"
        aria-label="Toggle italic"
        size="lg"
        onClick={handleReadySubmit}
      >
        {isPlayerReady ? "Ready" : "Not Ready"}
      </Toggle>
    </>
  )
}
