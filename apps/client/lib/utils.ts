import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import cookie from "cookie"
import { IncomingMessage } from "http"

export function parseCookies(req: IncomingMessage | undefined) {
  return cookie.parse(req ? req.headers.cookie || "" : "")
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
