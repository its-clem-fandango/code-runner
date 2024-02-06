import react from 'react'

function Dashboard (){

  function handleNewGame(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    console.log("Button Clicked")
  }

  return (
    
    <div>
      <div>
        <button> Start Battle </button>
        <div><h3> Join a Battle </h3>
        <div> The table here</div>
        </div>
      </div>
    </div>
  )

}

export default Dashboard