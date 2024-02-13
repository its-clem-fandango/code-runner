import dynamic from "next/dynamic"
import React from "react"
import ChallengeDescription from "../../components/ChallengeDescription"
import Lobby from "../battle/[id]/page"

const CodeEditor = dynamic(() => import("../../components/ui/MonacoCodeEditor"))

export default function EditorScreen() {
  return (
    <>
      <Lobby />
      <ChallengeDescription />
      <CodeEditor />
    </>
  )
}

//when creating a battle, I need the: user, battleId, battle input/name,
//make context fommnicate server with socket events andc ommunicate with data accordingly
//all the emits and ons should be on the context

//e.g. updater code is a method for that context

//how to create a custom hook to create a context for websockets
