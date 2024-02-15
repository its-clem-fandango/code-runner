"use client"

import { useState, useEffect } from "react"
import { socket } from "@/components/ui/socket"
import { Editor } from "@monaco-editor/react"
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

  const [submitMessage1, setSubmitMessage1] = useState<string>("")
  const [submitMessage2, setSubmitMessage2] = useState<string>("")

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()

  const [isClosed, setIsClosed] = useState(false)
  const victoryMsg = "You won!"
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
        let message2 = "Congratulations, all tests passed! You came first!"
        let message1 = victoryMsg

        setSubmitMessage1(message1)
        setSubmitMessage2(message2)

        setIsDialogOpen(true)
      }
      if (answer.clientId !== socket.id && answer.didAssertPass === true) {
        let message1 = "Sorry, you lost!"
        let message2 = "Try harder next time!"

        setSubmitMessage1(message1)
        setSubmitMessage2(message2)

        setIsDialogOpen(true)
      }
    })
  }, [])

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
    router.push('/')
  }

  return (
    <>
      <div className="bg-[#FAFAFA]">
        <div className="flex flex-col gap-10  ">
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
              onChange={(value: string | undefined) =>
                handleEditorChange(value)
              }
              className="my-2"
            />
            <div className="flex justify-end  ">
              <div
                onClick={handleSubmit}
                className=" flex w-[82px] h-[40px] bg-[#0F172A] rounded-lg px-4 gap-2 mb-4 mr-4 cursor-pointer "
              >
                <Image
                  src="/images/triangleIcon.svg"
                  width={9.33}
                  height={12}
                  alt="icon"
                />

                <button className=" text-white">Run</button>
              </div>
            </div>
          </div>
          <div className="  bg-white rounded-lg shadow  h-[351px]">
            <div className="  rounded-t-lg ">
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
            <div className={isClosed ? "filter blur-sm" : ""}>
              <Editor
                height="100%"
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
            <DialogContent className="flex flex-col items-center">
              <Image src={submitMessage1 === victoryMsg ? "/images/carWon.svg" : "/images/carLostSVG.svg"}
                width={286}
                height={390}
                alt="car" />
              <DialogTitle>{submitMessage1}</DialogTitle>
              <DialogDescription>{submitMessage2}</DialogDescription>
              <DialogClose asChild>
                <button onClick={goToDashboard} className="bg-[#17B26A] text-white rounded-md p-3">Go to Dashboard</button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  )
}
