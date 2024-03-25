"use client"

import { columns } from "@/app/dataTable/columns"
import { DataTable } from "@/app/dataTable/data-table"
import NewBattlePopup from "./battle-popup"
import { useRacesCollection } from "@/lib/useRacesCollection"
import { useAuth } from "@/lib/useAuth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { GetServerSideProps } from "next"
import { User } from "@/lib/useAuth"
import apicalls from "@/helper/apicalls"

type DashboardProps = {
  // Define any props your page will receive here
  // For example, user data if you fetch it server-side
  authenticatedUser?: User
}

function Dashboard({ authenticatedUser }: DashboardProps) {
  // const router = useRouter()
  const { user, isLoggedIn } = useAuth()
  const { races } = useRacesCollection()

  console.log("Dashboard: Checking user state", user)

  useEffect(() => {
    console.log("Dashboard: useEffect, user:", user)
    if (isLoggedIn === false) {
      console.log("Dashboard: User not logged in, redirecting to /login")
      // router.push("/login")
    }
  }, [isLoggedIn])

  /*   if (!user) {
    console.log("Dashboard: Rendering null due to no user")
    return null
  } */
  console.log(races)
  return (
    <div>
      <div className="flex border-0 border-violet-400 flex-col-reverse lg:flex-row">
        <div className="m-5 border-0 border-blue-400 flex-1">
          <h1 className="font-bold mb-5 text-xl">Join a Race 🏎️</h1>
          <DataTable
            className="w-full xl:w-[791px]"
            columns={columns}
            data={races}
          />
        </div>
        <div className="m-5 border-0 border-green-400">
          <h1 className="font-bold mb-5 text-xl">Start a Race 🏁</h1>
          <NewBattlePopup />
        </div>
      </div>
    </div>
  )
}

// Note: Next.js specific function for server-side rendering on this page.
// It checks for user authentication and loads user data server-side

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (
  context,
) => {
  // Retrieve the session Id from cookies attached to incoming request
  const token = context.req.cookies.sessionId

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  try {
    const authenticatedUser = await apicalls.validateSession(token)
    // If session is valid, return/pass fetched user data to the page
    return { props: { authenticatedUser } }
  } catch (error) {
    console.error("Error validating session: ", error)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }
}

export default Dashboard
