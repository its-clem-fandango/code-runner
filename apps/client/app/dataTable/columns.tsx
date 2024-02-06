"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"



// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Battle = {
  BattleName: string
    Username: string
    Difficulty: string
    Join: string
}

export const columns: ColumnDef<Battle>[] = [
    {
      accessorKey: "BattleName",
      header: () => <div className="text-right">Battle Name</div>,
      cell: ({ row }) => <div>{row.original.BattleName}</div>

    },
    {
        accessorKey: "Username",
        header: () => <div className="text-right">Username</div>,
        cell: ({ row }) => <div>{row.original.Username}</div>
      },
      {
        accessorKey: "Difficulty",
        header: () => <div className="text-right">Difficulty</div>,
        cell: ({ row }) => {
          
    
          return <div className="text-right font-medium">{row.original.Difficulty}</div>
        },
      },
      {
        accessorKey: "id", // You can use a different key if needed
    header: () => <div className="text-right">Join Game</div>,
    cell: ({ row }) => (
      <Button>Join</Button> // Define handleJoinGame function
    ),
        },
    
  ]
  