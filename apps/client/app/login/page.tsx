import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

export default function Login() {
  const redirect = process.env.NEXT_PUBLIC_REDIRECT_URI
    return (
      <div>
        <Button >
          <GitHubLogoIcon className="mr-2 h-4 w-4"/>
          <a href={redirect}>Github</a>
          </Button>     
           </div>
    )
  }
  