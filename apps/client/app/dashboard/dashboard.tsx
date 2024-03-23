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

type DashboardProps = {
  // Define any props your page will receive here
  // For example, user data if you fetch it server-side
}

function Dashboard() {
  const router = useRouter()
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

  try {
    // Send a request to backend's session validation endpooint with the sessionId so server can use  sessionId to look up session and determine if its valid
    const validationResponse = await fetch(
      "http://localhost:8080/session/validateSession",
      {
        method: "Get",
        headers: {
          Cookie: `sessionId=${token}`, //Forwards session cookie
        },
      },
    )

    if (!validationResponse.ok) {
      // Session is not valid; redirect to login
      console.error("Session validation failed")

      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      }
    }

    // Does this endpoint return user details or exist?
    const authenticatedUser: User = await validationResponse.json()
    console.log("User from dashboard returns successfully: ", authenticatedUser)

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
