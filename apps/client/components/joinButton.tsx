import { Button } from "./ui/button"
import { useRouter } from "next/router"

function JoinButton({ battleId }: { battleId: number }) {
  function handleJoinGame() {
    console.log(battleId)
  }
  return <Button onClick={handleJoinGame}>Join</Button>
}
export default JoinButton
