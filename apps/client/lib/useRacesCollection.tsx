import { useRouter } from "next/navigation"
import { createContext, useContext, useRef, useState } from "react"
import { Socket, io } from "socket.io-client"
import { useFirst } from "./useFirst"

// Redefine Race to match the expected structure of Battle data coming from the server
export interface Race {
  id: number
  battleName: string
  players: string[] // Ensure this is an array to match the backend data
  difficulty: string
  playerCount: number
  join: string
  challengeId: number
  isFull: boolean // This can be computed based on playerCount or players array length
  username: string // This should be derived from the players array
  clientId: string // Additional frontend-specific property
}

type RacesCollectionAction = "createBattle"

type SendRacesCollectionAction = (
  // eslint-disable-next-line no-unused-vars
  action: RacesCollectionAction,
  // eslint-disable-next-line no-unused-vars
  payload: any,
) => void

interface RacesCollectionContextType {
  races: Race[]
  sendRacesCollectionAction?: SendRacesCollectionAction
}

const defaultValue: RacesCollectionContextType = {
  races: [],
}
const RacesCollectionContext =
  createContext<RacesCollectionContextType>(defaultValue)

export const useRacesCollection = () => useContext(RacesCollectionContext)

export const RacesCollectionProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [races, setRaces] = useState<Race[]>([])
  const socketRef = useRef<Socket | null>(null)
  const [sendRacesCollectionAction, setSendRacesCollectionAction] = useState<
    SendRacesCollectionAction | undefined
  >(undefined)

  const router = useRouter()
  useFirst(() => {
    if (socketRef.current?.connected) return
    console.log("connecting to ws")

    let socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}/race-collection`, {
      withCredentials: true,
    })

    socketRef.current = socket

    socket.on("availableBattles", (data: Race[]) => {
      const formattedRaces = data.map((race: Race) => ({
        ...race,
        isFull: race.playerCount >= 2, // Assuming a full race has at least 2 players
        username: race.players[0] || "default_username", // Use the first player's name or a default
        clientId: "", // Assuming this needs to be fetched or set elsewhere
      }))
      setRaces(formattedRaces)
    })

    setSendRacesCollectionAction(() => {
      return (actionType: RacesCollectionAction, payload: any) => {
        socket?.emit(actionType, payload)
      }
    })

    socket.on("battleCreated", (data) => {
      router.push(`/battle?id=${data}`)
    })

    return () => {
      if (socketRef.current?.connected) {
        socketRef.current?.disconnect()
      }
    }
  })

  return (
    <RacesCollectionContext.Provider
      value={{
        races,
        sendRacesCollectionAction,
      }}
    >
      {children}
    </RacesCollectionContext.Provider>
  )
}
