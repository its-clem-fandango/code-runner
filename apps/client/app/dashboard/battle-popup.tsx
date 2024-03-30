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
  const [openRacePopup, setOpenRacePopup] = useState(false) // Manage dialog visibility here

  return (
    <Dialog open={openRacePopup} onOpenChange={setOpenRacePopup}>
      <DialogTrigger asChild>
        <Button
          className="flex flex-col items-center justify-center h-[150px] w-full bg-black rounded-lg text-white leading-7 "
          onClick={() => setOpenRacePopup(true)}
        >
          <div className="bg-white w-[30px] h-[30px] rounded-full mb-2">
            <p className="text-black text-xl">+</p>
          </div>

          <p className="text-xl font-manrope">Create a New Race</p>
          <p className="text-[#A0A0A0] font-manrope mb-2">
            Start a Race, wait for a rival
          </p>
        </Button>
      </DialogTrigger>

      {openRacePopup && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a New Race</DialogTitle>
            <DialogDescription>Customize your game.</DialogDescription>
          </DialogHeader>
          <BattleForm setOpen={setOpenRacePopup} />{" "}
          {/* Pass setOpen to BattleForm */}
        </DialogContent>
      )}
    </Dialog>
  )
}
