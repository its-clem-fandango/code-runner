"use client"
import { ReactNode, useEffect, useRef, useState } from "react"
import { createContext, useContext } from "react"
import { io } from "socket.io-client"
import { Socket } from "socket.io-client"

interface Challenge {
  id: number
  description: string
  difficulty: "easy" | "medium" | "hard"
}

interface Race {
  id: number
  isFull: boolean
  playerNumber: number
  challengeId: number
  challenge: Challenge
}

// eslint-disable-next-line no-unused-vars
type SendRaceAction = (action: string, payload: any) => void

interface RaceContextType {
  race: Race | null
  sendRaceAction?: SendRaceAction
}

const defaultContextValue: RaceContextType = {
  race: null,
  sendRaceAction: undefined,
}

const RaceContext = createContext<RaceContextType>(defaultContextValue)

export const useRace = () => useContext(RaceContext)

export const RaceProvider = ({ children }: { children: ReactNode }) => {
  const [race, setRace] = useState<Race | null>(null)
  const socketRef = useRef<Socket | null>(null)
  const [sendRaceAction, setSendRaceAction] = useState<
    undefined | (() => void)
  >()

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

    function handleJoinedBattle(msg: {
      id: number
      playerCount: number
      clientId: string
    }) {
      console.log("received joinedBattle", msg)
      if (msg.clientId === socket.id) {
        setRace((prevRace) => {
          if (prevRace === null) {
            return {
              id: msg.id,
              playerNumber: msg.playerCount,
              isFull: false,
              challengeId: 1,
              challenge: {
                id: 1,
                description: "Write a function that adds two numbers",
                difficulty: "easy",
              },
            }
          }

          return {
            ...prevRace,
            id: msg.id,
            playerNumber: msg.playerCount,
          }
        })
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
