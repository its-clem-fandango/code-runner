const API_URL = process.env.NEXT_PUBLIC_SERVER_URL

async function getChallengeData(id: number | undefined) {
  if (!id) {
    throw new Error("Challenge ID is undefined or null")
  }

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }

  const response = await fetch(`${API_URL}/codingchallenges/${id}`, options)

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status}`)
  }

  try {
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Failed to parse JSON", error)
    throw error
  }
}
export default { getChallengeData }
