"use client"

import { useState, useEffect } from "react"
import { socket } from "@/components/ui/socket"
import { Editor } from "@monaco-editor/react"
import "../../app/globals.css"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./dialog"

interface File {
  name: string
  language: string
  value: string
}

export default function MonacoCodeEditor({
  playerNumber,
}: {
  playerNumber: number | null
}) {
  const [code, setCode] = useState<string | undefined>("")
  const [recievedCode, setRecievedCode] = useState<string>("")
  /* const [playerNumber, setPlayerNumber] = useState<number>(1) */
  /* const [answerToChallenge, setAnswerToChallenge] = useState(null) */
  const [submitMessage, setSubmitMessage] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
      challengeId: 1,
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
      if (answer.clientId === socket.id) {
        let message = ""
        if (answer.message) {
          message = answer.message
        } else if (answer.didAssertPass === false) {
          message = answer.testResults[0].error
        } else {
          message = "Success: All tests passed!"
        }
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

  const closeDialog = () => {
    setIsDialogOpen(false) // Close dialog
  }

  useEffect(() => {
    socket.on("opponentCode", (msg) => {
      if (msg.clientId !== socket.id) {
        setRecievedCode(msg.message)
      }
    })
  }, [playerNumber])
  socket.emit("join room", roomName)

  return (
    <>
      <div className="container">
        <p>{playerNumber}</p>
        <div className="editors-container">
          <Editor
            height="60vh"
            width="40vw"
            theme="vs-dark"
            path={file.name}
            defaultLanguage={file.language}
            onChange={(value: string | undefined) => handleEditorChange(value)}
          />

          <Editor
            height="60vh"
            width="40vw"
            theme="vs-dark"
            defaultLanguage={file.language}
            value={recievedCode}
            options={{
              readOnly: true,
            }}
            className="read-only-editor editor"
          />
        </div>
        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogTitle>Test Result</DialogTitle>
              <DialogDescription>{submitMessage}</DialogDescription>
              <DialogClose asChild>
                <button>Close</button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  )
}
