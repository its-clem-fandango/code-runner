import { Button } from "@/components/ui/button";
import BattleForm from "./battle-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

import { toast } from "@/components/ui/use-toast";

export default function ButtonPopUp() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Start Battle</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Start Battle</DialogTitle>
          <DialogDescription>Customize game.</DialogDescription>
        </DialogHeader>

        <BattleForm />
      </DialogContent>
    </Dialog>
  );
}
