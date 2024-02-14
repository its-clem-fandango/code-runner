import { codingChallengesList } from "../../server/src/database/codingChallenges"
import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from "react-markdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"


function ChallengeDescription() {
  const challenge = codingChallengesList.map((challenge) => challenge)

  return (
    <div>
      <div>
        <div className="flex justify-between mr-5">
          <h1 className="font-bold text-xl border p-4 tracking-wide">
            {challenge[0].name}
          </h1>
          {challenge[0].difficultyOfChallenge === "easy" ? (
            <Image
              src="/images/oneStarDifficulty.svg"
              width={40}
              height={30}
              alt="Stars"

            />
          ) : challenge[0].difficultyOfChallenge === "medium" ? (
            <Image
              src="/images/twoStarDifficulty.svg"
              width={60}
              height={30}
              alt="Stars"
            />
          ) : challenge[0].difficultyOfChallenge === "hard" ? (
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

        <ScrollArea className="h-[200px] w-[650px] border p-4 tracking-wide">
          <ReactMarkdown>{challenge[0].description}</ReactMarkdown>
        </ScrollArea>
        <div className="bg-grey-200 border">
          <Tabs defaultValue="account" className="w-[600px] p-4 ">
            <TabsList className=" w-[620px] flex justify-start bg-[#F6F6F6]">
              <TabsTrigger value="account" >Example</TabsTrigger>
              <TabsTrigger value="password">Outcome</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className=" py-2">
              {/* <h1 className="text-xl font-bold py-2">Example</h1> */}
              <p >{
                `['hello', 'world', 'this', 'is', 'great']  =>  'hello world this is great'`
              }
              </p>
            </TabsContent >
            <TabsContent value="password" className=" py-2">Change your password here.</TabsContent>
          </Tabs>

        </div>
      </div>
    </div>
  )
}

export default ChallengeDescription
