"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"

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
    header: () => <div className="text-left">Battle Name</div>,
    cell: ({ row }) => <div>{row.original.BattleName}</div>,
  },
  {
    accessorKey: "Username",
    header: () => <div className="text-left">Username</div>,
    cell: ({ row }) => <div>{row.original.Username}</div>,
  },
  {
    accessorKey: "Difficulty",
    header: () => <div className="text-left">Difficulty</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left ">
          {row.original.Difficulty === "easy" ? (
            <Image
              src="/images/oneStarDifficulty.svg"
              width={40}
              height={30}
              alt="Stars"
            />
          ) : row.original.Difficulty === "medium" ? (
            <Image
              src="/images/twoStarDifficulty.svg"
              width={60}
              height={30}
              alt="Stars"
            />
          ) : row.original.Difficulty === "hard" ? (
            <Image
              src="/images/threeStarDifficulty.svg"
              width={80}
              height={30}
              alt="Stars"
            />
          ) : (
            ""
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "playerCount",
    header: () => <div className="text-left">Players</div>,
    cell: ({ row }) =>
      row.original.playerCount === 2 ? (
        <div className="text-red-400">{row.original.playerCount}/2</div>
      ) : (
        <div>{row.original.playerCount}/2</div>
      ),
  },
  /* {
    accessorKey: "id", // You can use a different key if needed
    header: () => <div className="text-left">Join Game</div>,
    cell: ({ row }) => (
      <JoinButton battleId={row.original.id} /> // Define handleJoinGame function
    ),
  }, */
]
