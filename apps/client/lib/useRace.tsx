"use client"
import apicalls from "@/helper/apicalls"
import { ReactNode, useEffect, useRef, useState } from "react"
import { createContext, useContext } from "react"
import { io } from "socket.io-client"
import { Socket } from "socket.io-client"
import { Race } from "./useRacesCollection"

interface Challenge {
  challengeId: number
  name: string
  description: string
  difficultyOfChallenge: string
  example: string
  tests: any[]
}
export interface ConsoleData {
  clientId: string
  didAssertPass: boolean
  testResults: Array<TestResults>
}
export interface TestResults {
  name: string
  input: unknown
  expected: unknown
  result: unknown
  passed: boolean
  error?: TestError
}
export interface TestError {
  generatedMessage: boolean
  code: string
  acutal: string
  expected: string
  operator: string
}
export interface SyntaxError {
  message: string
}

// eslint-disable-next-line no-unused-vars
type SendRaceAction = (action: string, payload: any) => void

interface RaceContextType {
  race: Race | null
  challengeData: Challenge | null
  sendRaceAction?: SendRaceAction
  consoleData: ConsoleData | null
  handleResult: (testResults: ConsoleData) => void
  syntaxError: SyntaxError | null
  handleSyntaxError: (testResults: SyntaxError | null) => void
}

const defaultContextValue: RaceContextType = {
  race: null,
  challengeData: null,
  consoleData: null,
  syntaxError: null,
  sendRaceAction: undefined,
  handleResult: () => {
    console.log('handleResult not implemented')
  },
  handleSyntaxError: () => {
    console.log('handleResult not implemented')
  },
}

const RaceContext = createContext<RaceContextType>(defaultContextValue)

export const useRace = () => useContext(RaceContext)

export const RaceProvider = ({ children }: { children: ReactNode }) => {
  const [race, setRace] = useState<Race | null>(null)
  const [challengeData, setChallengeData] = useState<Challenge | null>(null)
  const [consoleData, setConsoleData] = useState<ConsoleData | null>(null)
  const [syntaxError, setSyntaxError] = useState<SyntaxError | null>(null)
  const socketRef = useRef<Socket | null>(null)
  const [sendRaceAction, setSendRaceAction] = useState<undefined | (() => void)
  >()

  function handleResult(testResults: ConsoleData) {
    setConsoleData(testResults)
  }
  function handleSyntaxError(testResults: SyntaxError | null) {
    if (testResults?.message) {
      setSyntaxError(testResults)
    } else setSyntaxError(null)
  }

  useEffect(() => {
    if (socketRef.current?.connected) return
    console.log("create socket")
    let socket = io("ws://localhost:8082")

    socketRef.current = socket

    socket.on("connect", () => {
      console.log("connected!")
      setSendRaceAction(() => (actionType: string, payload: any) => {
        console.log("sendRaceAction", actionType, payload, socket)
        socket?.emit(actionType, payload)
      })
    })

    console.log("socket", socket)

    socket.on("error", (err) => {
      console.error("Socket error: ", err)
    })

    socket.on("raceUpdate", (update: Race) => {
      setRace((prevState) => ({ ...prevState, ...update }))
    })

    socket.on("connect_error", (err) => {
      console.error("Connection error: ", err)
    })

    async function handleJoinedBattle(msg: {
      id: number
      battleName: string
      difficulty: string
      join: string
      username: string
      clientId: string
      playerCount: number
      challengeId: number
    }) {
      if (msg.clientId === socket.id) {
        setRace((prevRace) => {
          if (prevRace === null) {
            return {
              id: msg.id,
              battleName: msg.battleName,
              isFull: msg.playerCount > 2,
              username: msg.username,
              join: msg.join,
              difficulty: msg.difficulty,
              clientId: msg.clientId,
              playerCount: msg.playerCount,
              challengeId: msg.challengeId,
            }
          }

          return {
            ...prevRace,
            id: msg.id,
            playerNumber: msg.playerCount,
            isFull: msg.playerCount > 2,
          }
        })

        setChallengeData(await apicalls.getChallangeData(msg.challengeId))
      }
    }

    socket.on("battleError", () =>
      setRace((prevRace) => {
        if (prevRace === null) return null
        return { ...prevRace, isFull: true }
      }),
    )

    socket.on("joinedBattle", handleJoinedBattle)

    return () => {
      console.log('mounting off socket')
      socket.close()
    }
  }, [])

  return (
    <RaceContext.Provider value={{ race, challengeData, consoleData, syntaxError, sendRaceAction, handleResult, handleSyntaxError }}>
      {children}
    </RaceContext.Provider>
  )
}

/**
 * - Connecting to the socket
 * - Listening to raceState updates from the socket
 * - Set up provider for all children to access
 * - giving access to state and sendRaceAction function to emit at their discretion
 */
