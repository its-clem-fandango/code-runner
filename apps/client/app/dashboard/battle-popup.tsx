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
        <Button
          className="flex flex-col items-center justify-center h-[150px] w-[340px] bg-black rounded-lg text-white leading-7 "
          onClick={() => setOpen(true)}
        >
          {/* <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span class="text-black text-3xl">+</span>
          </div> */}
          <div className="mt-4">
            <p className="flex justify-center text-2xl text-black bg-white rounded-full w-10 h-10 mt-2 mb-2">
              <span>+</span>
            </p>
          </div>

          <p className="text-xl font-manrope">Create a new Race</p>
          <p className="text-[#A0A0A0] font-manrope mb-2">
            Start a Race, wait for a rival
          </p>
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
