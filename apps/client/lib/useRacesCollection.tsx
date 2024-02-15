import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { Socket, io } from "socket.io-client"

export interface Race {
  id: number
  battleName: string
  isFull: boolean
  username: string
  join: string
  difficulty: string
  clientId: string
  playerCount: number
  challengeId: number
}

type RacesCollectionAction = "createBattle"

type SendRacesCollectionAction = (action: RacesCollectionAction, payload: any) => void

interface RacesCollectionContextType {
  races: Race[],
  sendRacesCollectionAction?: SendRacesCollectionAction
}

const defaultValue: RacesCollectionContextType = {
  races: [],
}

const RacesCollectionContext = createContext<RacesCollectionContextType>(defaultValue)

export const useRacesCollection = () => useContext(RacesCollectionContext)

export const RacesCollectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {

  const [races, setRaces] = useState<Race[]>([])
  const socketRef = useRef<Socket | null>(null)
  const [sendRacesCollectionAction, setSendRacesCollectionAction] = useState<SendRacesCollectionAction | undefined>(undefined)

  const router = useRouter()

  useEffect(() => {
    if (socketRef.current?.connected) return

    let socket = io("ws://localhost:8082")
    socketRef.current = socket


    socket.on("availableBattles", (data) => {
      setRaces(data)
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

  }, [])

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