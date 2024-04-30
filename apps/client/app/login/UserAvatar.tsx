import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/useAuth"

export default function UserAvatar() {
  const { logout, isLoggedIn } = useAuth()
  const [avatarURL, setAvatarURL] = useState<string | undefined>(undefined)

  function handleLogout() {
    console.log("Logging out...")
    if (isLoggedIn) {
      console.log("NO mames guey =...")

      logout()
    }
  }

  const fetchAvatarURL = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/user/profile/avatar`
      const response = await fetch(url, {
        method: "GET",
        credentials: "include", // Include cookies for session ID
      })

      if (!response.ok) {
        throw new Error("Failed to fetch avatar URL")
      }
      const data = await response.json()
      setAvatarURL(data.avatarURL)
    } catch (error) {
      console.error("Failed to fetch avatar URL", error)
    }
  }

  useEffect(() => {
    fetchAvatarURL()
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={avatarURL} alt="User Avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
