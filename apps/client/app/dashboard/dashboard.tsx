"use client"

import { useState, useEffect } from "react"
import { Battle, columns } from "@/app/dataTable/columns"
import { DataTable } from "@/app/dataTable/data-table"
import NewBattlePopup from "./battle-popup"
import { io } from "socket.io-client"

function Dashboard() {
  const [battleList, setBattleList] = useState<Battle[]>([])

  const socket = io("ws://localhost:8082")
  useEffect(() => {
    socket.on("availableBattles", (data) => {
      setBattleList(data)
    })
  }, [])

  return (
    <div>
      <div className="flex border-0 border-violet-400">
        <div className="m-5 border-0 border-blue-400">
          <h1 className="font-bold mb-5 text-xl">Join a Race 🏎️</h1>
          <DataTable columns={columns} data={battleList} />
        </div>
        <div className="m-5 border-0 border-green-400">
          <h1 className="font-bold mb-5 text-xl">Start a Race 🏁</h1>
          <NewBattlePopup />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
