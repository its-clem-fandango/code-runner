import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import cookie from "cookie"
import { IncomingMessage } from "http"
import { toast } from "sonner"

export function parseCookies(req: IncomingMessage | undefined) {
  return cookie.parse(req ? req.headers.cookie || "" : "")
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function CopyUrlButton() {
  // Get the current URL
  const url = window.location.href

  console.log("Click copyUrl")

  // Copy the URL to the clipboard
  navigator.clipboard
    .writeText(url)
    .then(() => {
      // Show a success toast
      toast("Copied to clipboard")
      console.log("Am i getting here")
    })
    .catch((err) => {
      // Show an error toast
      toast(`Failed to copy: ${err}`)
    })
}
