"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Battle = {
  id: number
  BattleName: string
  Username: string
  Difficulty: string
  playerCount: number
  Join: string
}

export const columns: ColumnDef<Battle>[] = [
  {
    accessorKey: "BattleName",
    header: () => <div className="text-right">Battle Name</div>,
    cell: ({ row }) => <div>{row.original.BattleName}</div>,
  },
  {
    accessorKey: "Username",
    header: () => <div className="text-right">Username</div>,
    cell: ({ row }) => <div>{row.original.Username}</div>,
  },
  {
    accessorKey: "Difficulty",
    header: () => <div className="text-right">Difficulty</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.original.Difficulty}</div>
      )
    },
  },
  {
    accessorKey: "playerCount",
    header: () => <div className="text-right">Players</div>,
    cell: ({ row }) =>
      row.original.playerCount === 2 ? (
        <div className="text-red-400">{row.original.playerCount}/2</div>
      ) : (
        <div>{row.original.playerCount}/2</div>
      ),
  },
  /* {
    accessorKey: "id", // You can use a different key if needed
    header: () => <div className="text-right">Join Game</div>,
    cell: ({ row }) => (
      <JoinButton battleId={row.original.id} /> // Define handleJoinGame function
    ),
  }, */
]
