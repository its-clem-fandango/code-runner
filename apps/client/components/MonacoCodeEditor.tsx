"use client"

import { useState, useEffect } from "react"
import { Editor } from "@monaco-editor/react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog"
import { useRouter } from "next/navigation"
import { useRace } from "@/lib/useRace"
import { useAuth } from "@/lib/useAuth"
import Image from "next/image"
import { PlayIcon } from "@radix-ui/react-icons"

interface File {
  name: string
  language: string
  value: string
}

export default function MonacoCodeEditor({
  playerNumber,
  challengeId,
  battleId,
}: {
  playerNumber: number | null
  challengeId: number | null
  battleId: number
}) {
  const { sendRaceAction, race } = useRace()
  const { user, isLoggedIn } = useAuth()

  const router = useRouter()

  const [endGameMessage, setEndGameMessage] = useState<{
    title: string
    message: string
  }>({
    title: "",
    message: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const [code, setCode] = useState<string>("")

  useEffect(() => {
    if (race?.victory !== undefined) {
      setEndGameMessage({
        title: race.victory ? victoryMsg : "You lost!",
        message: race.victory
          ? "Congratulations, all tests passed! You came in first!"
          : "Sorry, better luck next time.",
      }),
        setIsDialogOpen(true)
    }
  }, [race?.victory, sendRaceAction])

  const victoryMsg = "You won!"
  const roomName = battleId
  const files = {
    name: "script.js",
    language: "javascript",
    value: "let number = 5",
  }
  const file: File = files

  const handleSubmit = (e: any) => {
    e.preventDefault()
    sendRaceAction &&
      sendRaceAction("submit", {
        room: roomName,
        player: playerNumber,
        challengeId,
        message: code,
      })
  }

  const handleCodeChange = (code: string | undefined) => {
    /* notifies opponent */
    sendRaceAction &&
      sendRaceAction("codeChanged", {
        room: roomName,
        player: playerNumber,
        message: code,
      })

    setCode(code || "")
  }

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    setIsClosed((prevIsClosed) => !prevIsClosed)
  }

  function goToDashboard() {
    router.push("/")
  }

  return (
    <>
      <div className="bg-[#FAFAFA] h-full">
        <div className="flex flex-col gap-2 h-full">
          <div className=" bg-white rounded-lg shadow">
            <h1 className="bg-[#E7E7E7]  rounded-t-lg text-xl font-bold px-4 py-2">
              Your Solution
            </h1>
            <Editor
              height="300px"
              width="100%"
              theme="light"
              path={file.name}
              defaultLanguage={file.language}
              onChange={(value: string | undefined) => {
                handleCodeChange(value)
              }}
              className="my-2"
            />
            <div className="flex justify-end  ">
              <div
                onClick={handleSubmit}
                className=" flex items-center
                w-[82px] h-[40px] bg-[#0F172A] rounded-lg px-4 gap-2 mb-4 mr-4 cursor-pointer group"
              >
                <PlayIcon className="text-white stroke-border group-hover:stroke-green-500 transition-colors group-active:translate-y-[1px]" />

                <button className="text-white group-hover:text-green-500 transition-colors group-active:translate-y-[1px]">
                  Run
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow flex flex-col flex-1">
            <div className="rounded-t-lg ">
              <div className="flex justify-center py-4 gap-11 ">
                <div>🏎️</div>
                <div className="font-bold">Your Rival</div>
              </div>
              <div className="flex justify-between">
                <div className="ml-4 text-[#64748B]">
                  If you don’t want to see your rivals code, you can disabled
                  it.
                </div>
                <div className="mr-5">
                  <div>
                    <button onClick={handleButtonClick}>
                      {isClosed ? (
                        <Image
                          src="/images/eyeOpenIcon.svg"
                          width={20}
                          height={20}
                          alt="eye open icon"
                        />
                      ) : (
                        <Image
                          src="/images/eyeClosedIcon.svg"
                          width={20}
                          height={20}
                          alt="eye open icon"
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${isClosed ? "filter blur-sm" : ""} flex-1 rounded-b-lg overflow-clip`}
            >
              <Editor
                height="100%"
                width="100%"
                theme="light"
                defaultLanguage={file.language}
                value={race?.receivedCode || "// Waiting for opponent code"}
                options={{
                  readOnly: true,
                }}
                className="read-only-editor mt-2 "
              />
            </div>
          </div>
        </div>

        <div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="flex flex-col items-center">
              <Image
                src={
                  race?.victory
                    ? "/images/carWon.svg"
                    : "/images/carLostSVG.svg"
                }
                width={286}
                height={390}
                alt="car"
              />
              <DialogTitle>{endGameMessage.title}</DialogTitle>
              <DialogDescription>{endGameMessage.message}</DialogDescription>
              <DialogClose asChild>
                <button
                  onClick={goToDashboard}
                  className="bg-[#17B26A] text-white rounded-md p-3"
                >
                  Go to Dashboard
                </button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  )
}
