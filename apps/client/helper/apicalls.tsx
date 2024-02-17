const API_URL = "http://localhost:8080/"
async function getChallangeData(id: number) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
  const response = await fetch(`${API_URL}codingchallenges/${id}`, options)
  const data = await response.json()
  return data
}

export default { getChallangeData }
