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
    winRate: 0,
  })

  const fetchUserAnalytics = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/user/user-analytics`
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch results")
      }
      const data = await response.json()
      console.log("USER ANALYTICS DATA in analytics.tsx", data)
      setUserdata(data)
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
          <CardDescription>Wins: {userData.wins}</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={userData.winRate} />
        </CardContent>
        <CardFooter>
          <CardTitle>Win/Loss Ratio: {userData.winRate + "%"}</CardTitle>
        </CardFooter>
      </Card>
    </>
  )
}
