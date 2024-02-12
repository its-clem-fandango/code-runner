import { useState } from "react"
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { io } from "socket.io-client"
import {
  Form, // Assuming this is correctly aliased to FormProvider
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

// Your Zod schema
const FormSchema = z.object({
  battleName: z.string().min(2, "TOO SHORT MFER").max(25, "TOO LONG MFUCKER"),
  difficulty: z.enum(["easy", "medium", "hard"], {
    required_error: "You need to select a difficulty.",
  }),
})

// Type for the form data
type FormData = z.infer<typeof FormSchema>

// Interface for server response
interface ServerResponse {
  success: boolean
  message?: string
}

interface BattleFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function BattleForm({ setOpen }: BattleFormProps) {
  const socket = io("ws://localhost:8082")

  const formProps = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      battleName: "",
      difficulty: "easy",
    },
  })

  const handleBattleSubmit: SubmitHandler<FormData> = async (data) => {
    await socket.emit("createBattle", data)
    setOpen(false)
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
          <Button type="submit">Create Battle</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
