import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from "react-markdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

import { useState, useEffect } from "react"
import { ChallengeData, ConsoleData } from "@/app/battle/page"
import ChallengeConsole from "./ChallengeConsole"

function ChallengeDescription({
  data,
  consoleData,
  syntaxError,
}: {
  data: ChallengeData | null
  consoleData: ConsoleData | null
  syntaxError: string | null
}) {
  const [description, setDescription] = useState<string>("")

  useEffect(() => {
    if (data) setDescription(data.description)
  }, [data])

  return (
    <div>
      <div className="w-[45vw] ">
        <div className="flex justify-between mr-5 ">
          <h1 className="font-bold text-xl  w-[45vw] p-4 tracking-wide">
            {data?.name}
          </h1>
        </div>

        <ScrollArea className="h-[200px] w-[45vw]  p-4 tracking-wide">
          <ReactMarkdown>{description}</ReactMarkdown>
        </ScrollArea>
        <div className="bg-grey-200  w-[45vw]">
          <Tabs defaultValue="account" className="w-[40vw] p-4 ">
            <TabsList className=" w-[41vw] flex justify-start bg-[#F6F6F6]">
              <TabsTrigger value="account">Example</TabsTrigger>
              <TabsTrigger value="password">Outcome</TabsTrigger>
            </TabsList>
            <TabsContent value="example" className=" py-2">
              {/* <h1 className="text-xl font-bold py-2">Example</h1> */}
              <p>{data?.example ? data.example : null}</p>
            </TabsContent>
            <TabsContent value="console" className=" py-2">
              <ChallengeConsole
                consoleData={consoleData}
                syntaxError={syntaxError}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ChallengeDescription
