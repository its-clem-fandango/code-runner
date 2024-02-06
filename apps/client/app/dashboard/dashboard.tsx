"use client"

import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react'
import { Payment, columns } from '@/app/dataTable/columns'
import {DataTable} from '@/app/dataTable/data-table'


async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  
  const data: Payment[] = [
    
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      // ...
      
      
    ]
    return data
}

 function Dashboard() {

  
  const [battleList,setBattleList] = useState<Payment[]>([])

   useEffect(() => {
     const fetchData = async () => {
       const data = await getData()
       setBattleList(data)
     }

     fetchData()
   }, [])
   
   
  function handleNewGame(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    console.log("Button Clicked")
  }

  return (
    
    <div>
      <div>
      <Button onClick={handleNewGame}>Start Battle</Button>
        </div>
      
      <div>
        {/* rendert a table with 4 columns ( battle name, username, level of challenge, jopin button) */}

        
        <h3> Join a Battle </h3>
             <DataTable columns={columns} data={battleList} />

         <div> The table here</div>
      </div>
    </div>
  )

}

export default Dashboard