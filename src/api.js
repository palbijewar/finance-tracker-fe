const API_BASE_URL = "https://finance-tracker-be-qe3t.onrender.com";

export async function getExpenses() {
  const res = await fetch(`${API_BASE_URL}/expenses`);
  return res.json();
}

export async function createExpense(data) {
  const res = await fetch(`${API_BASE_URL}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateExpense(id, data) {
  const res = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteExpense(id) {
  const res = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
