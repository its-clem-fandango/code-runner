import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from "react-markdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { useState, useEffect } from "react"
import ChallengeConsole from "./ChallengeConsole"
import { useRace } from "@/lib/useRace"

function ChallengeDescription() {
  const [description, setDescription] = useState<string>("")
  const { challengeData, consoleData, syntaxError, race } = useRace()

  useEffect(() => {
    if (challengeData) setDescription(challengeData.description)
  }, [challengeData])

  return (
    <div className="w-[50%] h-[90vh] bg-white rounded-lg shadow" >
      {/* battle info */}
      <div className="flex justify-between mr-5">
        <h1 className="text-2xl font-bold p-4">
          {race ? race.battleName : null}
        </h1>
        {challengeData?.difficultyOfChallenge === "easy" ? (
          <Image
            src="/images/oneStarDifficulty.svg"
            width={40}
            height={30}
            alt="Stars"
          />
        ) : challengeData?.difficultyOfChallenge === "medium" ? (
          <Image
            src="/images/twoStarDifficulty.svg"
            width={60}
            height={30}
            alt="Stars"
          />
        ) : challengeData?.difficultyOfChallenge === "hard" ? (
          <Image
            src="/images/threeStarDifficulty.svg"
            width={80}
            height={30}
            alt="Stars"
          />
        ) : (
          ""
        )}
      </div>
      {/* Challenge info */}
      <div>
        <div className="w-[45vw]" >
          <div className="flex justify-between mr-5">
            <h1 className="font-bold text-xl border p-4 tracking-wide">
              {challengeData?.name}
            </h1>
          </div>

          <ScrollArea className="h-[200px] w-[45vw] p-4 tracking-wide">
            <ReactMarkdown>{description}</ReactMarkdown>
          </ScrollArea>
          <div className="bg-grey-200 border w-[45vw]">
            <Tabs defaultValue="example" className="w-[40vw] p-4 ">
              <TabsList className=" w-[41vw] flex justify-start bg-[#F6F6F6]">
                <TabsTrigger value="example">Example</TabsTrigger>
                <TabsTrigger value="console">Outcome</TabsTrigger>
              </TabsList>
              <TabsContent value="example" className=" py-2">
                {/* <h1 className="text-xl font-bold py-2">Example</h1> */}
                <p>{challengeData?.example ? challengeData.example : null}</p>
              </TabsContent>
              <TabsContent value="console" className=" py-2">
                <ChallengeConsole
                  consoleData={consoleData}
                  syntaxError={syntaxError?.message || null}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChallengeDescription
