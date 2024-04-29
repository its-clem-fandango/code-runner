import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

interface AuthProviderProps {
  children: ReactNode
  authenticatedUser?: User | null
}

export interface User {
  id: string
  sessionId: string
  username: string
  token?: string
  login?: string // username
  avatar_url?: string
  realName?: string //display name
}

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  isLoggedIn?: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isLoggedIn: false,
})

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  authenticatedUser,
}) => {
  const [user, setUser] = useState<User | null>(authenticatedUser ?? null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined)

  //Determines whether a user is logged in or not

  useEffect(() => {
    //Note: cookie is set with HttpOnly flag, so console logs won't/JS work be able to access it for security reasons
    const validateSession = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/session/validateSession`,
          {
            credentials: "include",
          },
        )
        if (response.ok) {
          const { user } = await response.json()
          setIsLoggedIn(true)
          setUser(user) // Update user state if session is valid
        } else {
          setIsLoggedIn(false)
          setUser(null) // Reset user state if session is invalid
          console.error("Session validation failed")
        }
      } catch (error) {
        console.error("Error validating session: ", error)
      }
    }
    validateSession()
  }, [])

  const value = { user, isLoggedIn, setUser }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use authentication context
export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}
