import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from "react-markdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { useState, useEffect } from "react"
import ChallengeConsole from "./ChallengeConsole"
import { useRace } from "@/lib/useRace"

type MarkdownComponents = {
  [key: string]: React.FC<{ children: React.ReactNode; className?: string }>
}
const markdownComponents: MarkdownComponents = {
  code: ({ children, className, ...props }) => {
    if (!className) {
      // when in an inline code block
      return (
        <code className="bg-gray-200 p-1 text-sm text-red-600 rounded-sm">
          {children}
        </code>
      )
    }

    // When in a pre, code block
    return (
      <code className="bg-gray-200 text-sm text-red-600 rounded-sm">
        {children}
      </code>
    )
  },
  pre: ({ children, className, ...props }) => {
    console.log("pre", {
      children,
      className,
      ...props,
    })
    return <pre className="bg-gray-200 my-2 rounded p-2 px-4">{children}</pre>
  },
}

function ChallengeDescription() {
  const [description, setDescription] = useState<string>("")
  const { race } = useRace()

  useEffect(() => {
    if (race?.challenge) setDescription(race?.challenge.description)
  }, [race?.challenge])

  return (
    <div className="w-[50%] h-[90vh] bg-white rounded-lg shadow">
      {/* battle info */}
      <div className="flex justify-between mt-5 mr-5">
        <h1 className="text-2xl font-bold p-4 px-8">
          {race ? race.battleName : null}
        </h1>
        {race?.challenge?.difficultyOfChallenge === "easy" ? (
          <Image
            src="/images/oneStarDifficulty.svg"
            width={40}
            height={30}
            alt="Stars"
          />
        ) : race?.challenge?.difficultyOfChallenge === "medium" ? (
          <Image
            src="/images/twoStarDifficulty.svg"
            width={60}
            height={30}
            alt="Stars"
          />
        ) : race?.challenge?.difficultyOfChallenge === "hard" ? (
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
        <div className="w-[45vw]">
          <div className="flex justify-between mr-5 px-4">
            <h1 className="font-bold text-xl p-4 tracking-wide">
              {race?.challenge?.name}
            </h1>
          </div>

          <ScrollArea className="h-[200px] p-4 px-8">
            <ReactMarkdown components={markdownComponents}>
              {description}
            </ReactMarkdown>
          </ScrollArea>
          <div className="bg-grey-200 w-full">
            <Tabs defaultValue="example" className="w-full p-4">
              <TabsList className=" w-full flex justify-start bg-[#F6F6F6]">
                <TabsTrigger value="example">Example</TabsTrigger>
                <TabsTrigger value="console">Outcome</TabsTrigger>
              </TabsList>
              <TabsContent value="example" className="px-4 py-2">
                {/* <h1 className="text-xl font-bold py-2">Example</h1> */}
                <ReactMarkdown components={markdownComponents}>
                  {race?.challenge?.example ? race?.challenge.example : null}
                </ReactMarkdown>
              </TabsContent>
              <TabsContent value="console" className=" py-2">
                <ChallengeConsole
                  consoleData={race?.consoleData}
                  syntaxError={race?.syntaxError?.error}
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
