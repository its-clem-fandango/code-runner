import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Progress } from "@/components/ui/progress"

export default function UserAnalytics() {
  const [userData, setUserdata] = useState({
    wins: 0,
    losses: 0,
  })

  const fetchUserAnalytics = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/user-analytics`
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch results")
      }
      const data = await response.json()
      setUserdata(data.results)
    } catch (error) {
      console.error("Failed to fetch user race results", error)
    }
  }

  useEffect(() => {
    fetchUserAnalytics()
  }, [])

  return (
    <>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Your Data</CardTitle>
          <CardDescription>Wins: {69}</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={50} />
        </CardContent>
        <CardFooter>
          <CardTitle>Win/Loss Ratio: {userData.wins}</CardTitle>
        </CardFooter>
      </Card>
    </>
  )
}
