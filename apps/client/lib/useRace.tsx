'use client'
import { useEffect, useState } from 'react'
import { createContext, useContext } from 'react'
import io from 'socket.io-client'
import { Socket } from 'socket.io-client'

interface RaceState {
  isFull: boolean
  playerNumber: number | null
  setUpRef: boolean
  battleId: number | null
  socket: Socket | null
  challengeId: number | null
}

interface RaceContextType {
  raceState: {}
  sendRaceAction: (action: string, payload: any) => void
}

const defaultContextValue: RaceContextType = {
  raceState: {},
  sendRaceAction: () => {}, // Placeholder func
}

const RaceContext = createContext<RaceContextType>(defaultContextValue)

export const useRace = () => useContext(RaceContext)

export const RaceProvider = ({ children }) => {
  const [raceState, setRaceState] = useState<RaceState>({
    isFull: false,
    playerNumber: null,
    setUpRef: false,
    battleId: null,
    socket: null,
    challengeId: null,
  })

  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io('ws://localhost:8082')
    setSocket(newSocket)

    newSocket.on('raceUpdate', (update: typeof raceState) => {
      setRaceState((prevState) => ({ ...prevState, ...update }))
    })
    return () => newSocket.close()
  }, [])

  const sendRaceAction = (actionType: string, payload: any) => {
    socket?.emit(actionType, payload)
  }

  return (
    <RaceContext.Provider value={{ raceState, sendRaceAction }}>
      {children}
    </RaceContext.Provider>
  )
}
