"use client"

import React, { ReactHTMLElement, MouseEvent, ChangeEvent } from "react"
import { useState, useEffect } from "react"
import { socket } from "@/components/ui/socket"
import { Editor } from "@monaco-editor/react"
import "../app/globals.css"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog"
import { useRouter } from "next/navigation"
import { ConsoleData } from "@/app/battle/page"
import Image from "next/image"

interface File {
  name: string
  language: string
  value: string
}

export default function MonacoCodeEditor({
  playerNumber,
  challengeId,
  handleResults,
  handleSyntaxError,
}: {
  playerNumber: number | null
  challengeId: number | null
  handleResults: (result: ConsoleData) => void
  handleSyntaxError: (result: SyntaxError) => void
}) {
  const [code, setCode] = useState<string | undefined>("")
  const [recievedCode, setRecievedCode] = useState<string>("")
  /* const [playerNumber, setPlayerNumber] = useState<number>(1) */
  /* const [answerToChallenge, setAnswerToChallenge] = useState(null) */
  const [submitMessage, setSubmitMessage] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const router = useRouter()

  const roomName = 1
  const files = {
    name: "script.js",
    language: "javascript",
    value: "let number = 5",
  }
  const file: File = files

  const handleEditorChange = (code: string | undefined) => {
    setCode(code)
    sendMessage(code)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    socket.emit("submit", {
      room: roomName,
      player: playerNumber,
      message: code,
      challengeId: challengeId,
      clientId: socket.id,
    })
  }

  const sendMessage = (code: string | undefined) => {
    socket.emit("codeChanged", {
      room: roomName,
      player: playerNumber,
      message: code,
    })
  }

  useEffect(() => {
    socket.on("testResult", (answer) => {
      if (answer.clientId === socket.id && answer.didAssertPass === false) {
        handleResults(answer)
        handleSyntaxError(answer)
        console.log(answer)
      }
      if (answer.clientId === socket.id && answer.didAssertPass === true) {
        let message = "Congratulations, all tests passed!"
        setSubmitMessage(message)
        setIsDialogOpen(true)
      }
      if (answer.clientId !== socket.id && answer.didAssertPass === true) {
        let message = "Sorry you lost!"
        setSubmitMessage(message)
        setIsDialogOpen(true)
      }
    })
  }, [])

  const handleButtonClick = (e) => {
    e.preventDefault()
    setIsClosed((prevIsClosed) => !prevIsClosed)
    // Change Blur
  }

  useEffect(() => {
    socket.on("opponentCode", (msg) => {
      if (msg.clientId !== socket.id) {
        setRecievedCode(msg.message)
      }
    })
  }, [playerNumber])
  socket.emit("join room", roomName)

  function goToDashboard() {
    router.back()
  }

  return (
    <>
      <div className="bg-[#FAFAFA]">
        <div className="flex flex-col gap-10 border border-purple-400 ">
          <div className="border border-yellow-400 bg-white rounded-lg">
            <h1 className="bg-[#E7E7E7]  rounded-t-lg text-xl font-bold px-4 py-2">
              Your Solution
            </h1>
            <Editor
              height="300px"
              width="100%"
              theme="light"
              path={file.name}
              defaultLanguage={file.language}
              onChange={(value: string | undefined) =>
                handleEditorChange(value)
              }
              className="my-2"
            />
            <div className="flex justify-end  ">
              <div className=" flex w-[82px] h-[40px] bg-[#0F172A] rounded-lg px-4 gap-2 mb-4 mr-4">
                <Image
                  src="/images/triangleIcon.svg"
                  width={9.33}
                  height={12}
                  alt="icon"
                />

                <button className=" text-white" onClick={handleSubmit}>
                  Run
                </button>
              </div>
            </div>
          </div>
          <div className="border border-orange-400 bg-white rounded-lg">
            <div className="  rounded-t-lg border border-green-400">
              <div className="flex justify-center py-4 gap-11 border border-yellow-400">
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
            <div className={isClosed ? "filter blur-sm" : ""}>
              <Editor
                height="300px"
                width="100%"
                theme="light"
                defaultLanguage={file.language}
                value={recievedCode}
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
            <DialogContent>
              <DialogTitle>You won!</DialogTitle>
              <DialogDescription>{submitMessage}</DialogDescription>
              <DialogClose asChild>
                <button onClick={goToDashboard}>Go to Dashboard</button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  )
}
