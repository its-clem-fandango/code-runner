import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

export default function Login() {
  const redirect = process.env.NEXT_PUBLIC_REDIRECT_URI
  return (
    <a href={redirect}>
      <Button className="bg-white text-slate-900" variant="secondary">
        <GitHubLogoIcon className="mr-2 h-4 w-4" />
        <span>Login with Github</span>
      </Button>
    </a>
  )
}
