"use client"

import { Button } from "@/components/ui/button";

function Dashboard (){

  function handleNewGame(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    console.log("Button Clicked")
  }

  return (
    
    <div>
      <div>
      <Button onClick={handleNewGame}>New Game</Button>
        <button> Start Battle </button>
        <div><h3> Join a Battle </h3>
        <div> The table here</div>
        </div>
      </div>
    </div>
  )

}

export default Dashboard