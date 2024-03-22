"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { Race } from "@/lib/useRacesCollection"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Race>[] = [
  {
    accessorKey: "battleName",
    header: () => <div className="text-left">Race Name</div>,
    cell: ({ row }) => <div>{row.original.battleName}</div>,
  },
  {
    accessorKey: "username",
    header: () => <div className="text-left">Username</div>,
    cell: ({ row }) => <div>{row.original.username}</div>,
  },
  {
    accessorKey: "difficulty",
    header: () => <div className="text-left">Difficulty</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left ">
          {row.original.difficulty === "easy" ? (
            <Image
              src="/images/oneStarDifficulty.svg"
              width={40}
              height={30}
              alt="Stars"
            />
          ) : row.original.difficulty === "medium" ? (
            <Image
              src="/images/twoStarDifficulty.svg"
              width={60}
              height={30}
              alt="Stars"
            />
          ) : row.original.difficulty === "hard" ? (
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
