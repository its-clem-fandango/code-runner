import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import BattleForm from "@/app/dashboard/battle-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ButtonPopUp() {
  const [open, setOpen] = useState(false) // Manage dialog visibility here

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Start Battle
        </Button>
      </DialogTrigger>

      {open && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Start Battle</DialogTitle>
            <DialogDescription>Customize game.</DialogDescription>
          </DialogHeader>
          <BattleForm setOpen={setOpen} /> {/* Pass setOpen to BattleForm */}
        </DialogContent>
      )}
    </Dialog>
  )
}
