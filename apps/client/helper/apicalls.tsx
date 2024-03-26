const API_URL = process.env.NEXT_PUBLIC_SERVER_URL

async function getChallengeData(id: number) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
  const response = await fetch(`${API_URL}/codingchallenges/${id}`, options)
  const data = await response.json()
  return data
}

async function validateSession(sessionId: string) {
  // Send a request to backend's session validation endpooint with the sessionId so server can use  sessionId to look up session and determine if its valid

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `sessionId=${sessionId}`,
    },
  }

  const response = await fetch(`${API_URL}/session/validateSession`, options)
  if (!response.ok) {
    throw new Error("Session validation failed")
  }
  const userDetails = await response.json()
  return userDetails
}

export default { getChallengeData, validateSession }
