"use client"

import { useEffect, useRef } from "react"
import { useRace } from "@/lib/useRace" // Ensure this import is correct

export default function Lobby({ battleId }: {battleId: number}) {
  const { sendRaceAction } = useRace()
  const first = useRef(true) // Tracks if the join action has been performed
  const { race } = useRace()

  useEffect(() => {
    // Ensure the join action is only performed once upon component mount
    if (first.current && sendRaceAction) {
      sendRaceAction("joinBattle", { id: battleId })
      first.current = false // Prevent future invocations
    }
  }, [sendRaceAction, battleId])


  //if new player joins --> Means I need to recieve something from the backend. what?
  //and is ready
  //render the new-game

  return (
    <>
      <h1>Waiting for other players to join...</h1>
{/*       <Toggle
        variant="outline"
        aria-label="Toggle italic"
        size="lg"
        onClick={handleReadySubmit}
      >
        {isPlayerReady ? "Ready" : "Not Ready"}
      </Toggle> */}
    </>
  )
}
