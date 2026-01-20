const API_BASE_URL = "http://localhost:4000";

export async function getExpenses() {
  const response = await fetch(`${API_BASE_URL}/expenses`);
  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }
  return response.json();
}
