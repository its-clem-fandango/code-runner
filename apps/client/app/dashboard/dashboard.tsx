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

  function handleNewGame(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    console.log("Button Clicked")
  }

  return (
    <div>
      <div className="flex justify-end">
        <NewBattlePopup />
      </div>

      <div>
        {/* rendert a table with 4 columns ( battle name, username, level of challenge, jopin button) */}
        <DataTable columns={columns} data={battleList} />
      </div>
    </div>
  )
}

export default Dashboard
