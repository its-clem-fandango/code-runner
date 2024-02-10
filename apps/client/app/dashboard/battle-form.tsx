import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { io } from "socket.io-client"

const FormSchema = z.object({
  battleName: z
    .string({ required_error: "Set a name." })
    .min(2, "TOO SHORT MFER")
    .max(25, "TOO LONG MFUCKER"),
  difficulty: z.enum(["easy", "medium", "hard"], {
    required_error: "You need to select a difficulty.",
  }),
})

type createBattleResponse = {
  success: boolean
  message?: string
}
export default function BattleForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(true)

  const socket = io("ws://localhost:8082")
  const formProps = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function closeDialog() {
    setIsDialogOpen(false)
  }

  function handleBattleSubmit() {
    const values = formProps.getValues()
    console.log(values)
    socket.emit("createBattle", values, (response: createBattleResponse) => {
      if (false) {
        closeDialog()
      } else {
        response.message
      }
    })
  }

  return (
    <Form {...formProps}>
      <form onSubmit={formProps.handleSubmit(handleBattleSubmit)}>
        <FormField
          control={formProps.control}
          name="battleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">Room Name</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formProps.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Choose your difficulty...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="easy" />
                    </FormControl>
                    <FormLabel className="font-normal">Easy</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="medium" />
                    </FormControl>
                    <FormLabel className="font-normal">Medium</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="hard" />
                    </FormControl>
                    <FormLabel className="font-normal">Hard</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <DialogClose>
            <Button type="submit">Create Battle</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  )
}
