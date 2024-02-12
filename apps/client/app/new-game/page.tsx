import dynamic from "next/dynamic"
import React from "react"
import ChallengeDescription from "../../components/ChallengeDescription"

const CodeEditor = dynamic(() => import("../../components/ui/MonacoCodeEditor"))

export default function EditorScreen() {
  return (
    <>
      <ChallengeDescription />
      <CodeEditor />
    </>
  )
}
