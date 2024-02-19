"use client"

import { columns } from "@/app/dataTable/columns"
import { DataTable } from "@/app/dataTable/data-table"
import NewBattlePopup from "./battle-popup"
import { useRacesCollection } from "@/lib/useRacesCollection"

function Dashboard() {
  const { races } = useRacesCollection()

  return (
    <div>
      <div className="flex border-0 border-violet-400 flex-col-reverse lg:flex-row">
        <div className="m-5 border-0 border-blue-400 flex-1">
          <h1 className="font-bold mb-5 text-xl">Join a Race 🏎️</h1>
          <DataTable
            className="w-full xl:w-[791px]"
            columns={columns}
            data={races}
          />
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
