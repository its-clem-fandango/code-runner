"use client";

import { useState, useEffect } from "react";
import { Battle, columns } from "@/app/dataTable/columns";
import { DataTable } from "@/app/dataTable/data-table";
import ButtonPopUp from "./battle-popup";

async function getData(): Promise<Battle[]> {
  // Fetch data from your API here.

  const data: Battle[] = [
    {
      BattleName: "Battle me and my monkey",
      Username: "Manel",
      Difficulty: "easy",
      Join: "m@example.com",
    },
    {
      BattleName: "wtf did u just say to me u lil bitch",
      Username: "Juneau",
      Difficulty: "easy",
      Join: "fightme@example.com",
    },
    // ...
  ];
  return data;
}

function Dashboard() {
  const [battleList, setBattleList] = useState<Battle[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setBattleList(data);
    };

    fetchData();
  }, []);

  function handleNewGame(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log("Button Clicked");
  }

  return (
    <div>
      <div className="flex justify-end">
        <ButtonPopUp />
      </div>

      <div>
        {/* rendert a table with 4 columns ( battle name, username, level of challenge, jopin button) */}
        <DataTable columns={columns} data={battleList} />
      </div>
    </div>
  );
}

export default Dashboard;
