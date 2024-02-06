import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Button>This is my ShadCN Button</Button>
      <Link href="/new-game">
        <Button>New Game</Button>
      </Link>
    </div>
  );
}
