import { ReactNode, createContext, useContext, useEffect, useState } from "react"

interface AuthProviderProps {
    children: ReactNode
}

interface User {
    token: string
    login: string; // username
    avatar_url: string;
    name: string; //display name
}

interface AuthContextType {
    user: User | null
    setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType>({user: null, setUser: () => {}})

const getCookie = (name: string) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    const cookieValue = parts.pop()
    if (cookieValue !== undefined) {
        return cookieValue.split(';').shift()
    } 
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    //Determines whether a user is logged in or not
    const [user, setUser] = useState<User | null>(null)
  
    useEffect(() => {

        //Note: cookie is set with HttpOnly flag, so console.logs won't/JS work be able to access it for security reasons
        const fetchUserDetails = async () => {
            if (typeof window !== "undefined") {\
                //REMOVE: token - cannot access from FE
                const token = getCookie('accessToken') 
                console.log("Attempting to fetch user details with token:", token)

                if (token) {
                    try {
                        const response = await fetch('https://api.github.com/user', {
                            headers: {
                                Authorization: `token ${token}`
                            }
                        })
                        if (response.ok) {
                            const userData = await response.json()
                            setUser({
                                token,
                                login: userData.login,
                                avatar_url: userData.avatar_url,
                                name: userData.name,
                            })
                        } else {
                            console.error("Failed to fetch user details")
                        }
                    } catch (error) {
                        console.error("Error fetching user details: ", error)
                    }
                   }
            }
          
        }
        fetchUserDetails()
    }, [])
  
    const value: AuthContextType = { user, setUser }
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

  
  // Custom hook to use authentication context
  export const useAuth = () => {
    const context =   useContext(AuthContext)
    console.log("Current user in useAuth:", context.user)
    return context
  }

