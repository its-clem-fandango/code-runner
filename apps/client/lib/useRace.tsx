"use client"
import apicalls from "@/helper/apicalls"
import { ReactNode, useRef, useState } from "react"
import { createContext, useContext } from "react"
import { io } from "socket.io-client"
import { Socket } from "socket.io-client"
import { Race } from "./useRacesCollection"
import { useFirst } from "./useFirst"

export interface OngoingRace extends Race {
  challenge: Challenge,
  consoleData?: ConsoleData,
  syntaxError?: SyntaxError
  victory?: boolean
  receivedCode?: string
}
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
  actual: string
  expected: string
  operator: string
}
export interface SyntaxError {
  error: string
}

type RaceAction = "submit" | "codeChanged" | "joinBattle"

// eslint-disable-next-line no-unused-vars
type SendRaceAction = (action: RaceAction, payload: any) => void

interface RaceContextType {
  race: OngoingRace | null
  sendRaceAction?: SendRaceAction
}

const defaultContextValue: RaceContextType = {
  race: null,
  sendRaceAction: undefined,
}

const RaceContext = createContext<RaceContextType>(defaultContextValue)

export const useRace = () => useContext(RaceContext)

export const RaceProvider = ({ children }: { children: ReactNode }) => {
  const [race, setRace] = useState<OngoingRace | null>(null)
  const socketRef = useRef<Socket | null>(null)
  const [sendRaceAction, setSendRaceAction] = useState<undefined | (() => void)
  >()

  function handleResult(testResults?: ConsoleData) {
    setRace(prev => {
      if (!prev) return null
      return {
        ...prev,
        consoleData: testResults,
      }

    })
  }
  function handleSyntaxError(testResults: SyntaxError | null) {
    if (testResults?.error) {
      setRace(prev => {
        if (!prev) return null
        return {
          ...prev,
          syntaxError: testResults,
        }
      })

    } else setRace(prev => {
      if (!prev) return null
      return {
        ...prev,
        syntaxError: undefined,
      }
    })
  }

  useFirst(() => {
    if (socketRef.current?.connected) return
    let socket = io("http://localhost:8080/race")

    socketRef.current = socket

    socket.on("connect", () => {
      setSendRaceAction(() => (actionType: RaceAction, payload: any) => {
  
        if (typeof payload === 'object' && !Array.isArray(payload)) {
          socket?.emit(actionType, {
            ...payload,
            clientId: socket.id,
          })
        } else {

          socket?.emit(actionType, payload)
        }

      })
    })

    socket.on("error", (err) => {
      console.error("Socket error: ", err)
    })

    socket.on("raceUpdate", (update: OngoingRace) => {
      setRace((prevState) => ({ ...prevState, ...update }))
    })

    socket.on("connect_error", (err) => {
      console.error("Connection error: ", err)
    })

    function handleJoinedBattle(msg: Race) {
      apicalls.getChallangeData(msg.challengeId)
        .then(challenge => {
          setRace((prevRace) => {
            if (prevRace === null) {
              return {
                ...msg,
                challenge,
                playerCount: msg.playerCount,
                isFull: msg.playerCount >= 2,
              }
            }

            return {
              ...prevRace,
              id: msg.id,
              playerCount: msg.playerCount,
              isFull: msg.playerCount >= 2,
            }
          })
        })
        .catch(err => {
          console.error("Error getting challenge data: ", err)
        })
    }

    socket.on("battleError", () =>
      setRace((prevRace) => {
        if (prevRace === null) return null
        return { ...prevRace, isFull: true }
      }),
    )

    socket.on("joinedBattle", handleJoinedBattle)

    socket.on("testResult", (answer: SyntaxError & ConsoleData) => {
      if (answer.clientId === socket.id && answer.didAssertPass === false) {
        handleSyntaxError(answer)
        handleResult(answer)
      }

      if (answer.clientId === socket.id && answer.didAssertPass === true) {
        setRace(prev => {
          if (!prev) return null
          return {
            ...prev,
            victory: true,
          }
        })
      }
      if (answer.clientId !== socket.id && answer.didAssertPass === true) {
        setRace(prev => {
          if (!prev) return null
          return {
            ...prev,
            victory: false,
          }
        })

      }
    })

    socket.on("opponentCode", (msg) => {
      if (msg.clientId !== socket.id) {
        setRace(prev => {
          if (!prev) return null
          return {
            ...prev,
            receivedCode: msg.message,
          }
        })
      }
    })

    return () => {
      if (socketRef.current?.connected) {
        socketRef.current?.disconnect()
      }
    }
  })

  return (
    <RaceContext.Provider value={{ race, sendRaceAction }}>
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
