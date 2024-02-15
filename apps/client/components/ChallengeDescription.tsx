import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from "react-markdown"
import { useState, useEffect } from "react"
import { ChallengeData } from "@/app/battle/page"

function ChallengeDescription({ data }: { data: ChallengeData | null }) {
  const [description, setDescription] = useState<string>("")

  useEffect(() => {
    if (data) setDescription(data.description)
  }, [data])

  return (
    <div>
      <div>
        <h1 className="h-[100px] w-[700px] rounded-md border p-4">
          {data ? data.name : null}
        </h1>
        <ScrollArea className="h-[200px] w-[700px] rounded-md border p-4">
          Description : <ReactMarkdown>{description}</ReactMarkdown>
        </ScrollArea>
      </div>
    </div>
  )
}

export default ChallengeDescription
