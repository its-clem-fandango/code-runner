import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

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
import { DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRacesCollection } from "@/lib/useRacesCollection"

// Your Zod schema
const FormSchema = z.object({
  battleName: z
    .string({ required_error: "Set a name." })
    .min(2, "Minimum 2 characters!")
    .max(25, "Maxiumum 25 characters!"),
  difficulty: z.enum(["easy", "medium", "hard"], {
    required_error: "You need to select a difficulty.",
  }),
})

// Type for the form data
type FormData = z.infer<typeof FormSchema>

// Interface for server response
interface BattleFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function BattleForm({ setOpen }: BattleFormProps) {
  const { sendRacesCollectionAction } = useRacesCollection()

  const formProps = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      battleName: "",
      difficulty: "easy",
    },
  })

  const handleBattleSubmit: SubmitHandler<FormData> = async (data) => {
    sendRacesCollectionAction?.("createBattle", data)
  }

  return (
    <Form {...formProps}>
      <form onSubmit={formProps.handleSubmit(handleBattleSubmit)}>
        <FormField
          control={formProps.control}
          name="battleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">Race Name</FormLabel>
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
          <Button type="submit">Start Race</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
