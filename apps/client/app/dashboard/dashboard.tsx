"use client"

import { columns } from "@/app/dataTable/columns"
import { DataTable } from "@/app/dataTable/data-table"
import NewBattlePopup from "./battle-popup"
import { useRacesCollection } from "@/lib/useRacesCollection"
import { useAuth } from "@/lib/useAuth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

type DashboardProps = {
  // Define any props your page will receive here
  // For example, user data if you fetch it server-side
};

function Dashboard() {
  const router = useRouter()
  const { user } = useAuth()
  const { races } = useRacesCollection()
  
    console.log("Dashboard: Checking user state", user)
  
    useEffect(() => {
      console.log("Dashboard: useEffect, user:", user)
      if (!user) {
        console.log("Dashboard: User not logged in, redirecting to /login")
        router.push('/login')
      }
    }, [user, router])
  
    if (!user) {
      console.log("Dashboard: Rendering null due to no user")
      return null
    }  
  
  return (
    <div>
      <div className="flex border-0 border-violet-400">
        <div className="m-5 border-0 border-blue-400">
          <h1 className="font-bold mb-5 text-xl">Join a Race 🏎️</h1>
          <DataTable columns={columns} data={races} />
        </div>
        <div className="m-5 border-0 border-green-400">
          <h1 className="font-bold mb-5 text-xl">Start a Race 🏁</h1>
          <NewBattlePopup />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<DashboardProps>> => {
  const token = context.req.cookies.accessToken

  if (!token || !validateToken(token)) { // Assuming validateToken is a function that checks token validity
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  // Optional: Fetch user data based on the token and pass it as props
  const user = fetchUserData(token) // Placeholder function

  return { props: { user } } // Pass user data as props
}

export default Dashboard
