"use client"

import { columns } from "@/app/dataTable/columns"
import { DataTable } from "@/app/dataTable/data-table"
import NewBattlePopup from "./battle-popup"
import { useRacesCollection } from "@/lib/useRacesCollection"

function Dashboard() {
  const { races } = useRacesCollection()

  return (
    <div>
      <div className="flex border-0 border-violet-400">
        <div className="m-5 border-0 border-blue-400">
          <h1 className="font-bold mb-5 text-xl">Join a Race 🏎️</h1>
          <DataTable columns={columns} data={races} />
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
