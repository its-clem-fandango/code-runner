"use client"

import { useCallback, useEffect, useRef } from "react"
import { useRace } from "@/lib/useRace" // Ensure this import is correct
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import cookie from "cookie"

export default function Lobby({ battleId }: { battleId: number }) {
  const { sendRaceAction } = useRace()
  const first = useRef(true) // Tracks if the join action has been performed
  const router = useRouter()
  console.log("***JOINED LOBBY***")

  useEffect(() => {
    // Ensure the join action is only performed once upon component mount
    console.log("Available cookies:", document.cookie)
    const cookies = cookie.parse(document.cookie)
    const username = cookies.username
    console.log("USERNAME PARSED IN LOBBY", username)

    if (first.current && sendRaceAction) {
      sendRaceAction("joinBattle", { id: battleId, username })
      first.current = false // Prevent future invocations
      console.log("SENT JOIN BATTLE ACTION IN LOBBY")
    }
  }, [sendRaceAction, battleId])

  function handleCancel() {
    const username = cookie.parse(document.cookie).username
    if (sendRaceAction) {
      sendRaceAction("leaveBattle", { id: battleId, username })
    }
    router.back()
  }
  /* const handleCancel = useCallback(function() {
  const username = cookie.parse(document.cookie).username;
  sendRaceAction("leaveBattle", { id: battleId, username });
  router.back();
}, [sendRaceAction, battleId, router]); */

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px] flex flex-col justify-center items-center">
        {" "}
        {/* This ensures the Card's internal layout is centered */}
        <CardHeader className="text-center">
          <CardTitle>Waiting for another player to join the race...</CardTitle>
          <CardDescription>On your mark, get set...</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
