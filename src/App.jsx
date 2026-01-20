import { useEffect, useState } from "react";
import { getExpenses, createExpense } from "./api";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const idempotencyKey = Date.now().toString();

    try {
      await createExpense({
        amount: Number(amount),
        description,
        idempotencyKey,
      });

      setAmount("");
      setDescription("");
      loadExpenses();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="app-container">
      <h2>Expense Tracker</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Add Expense</button>
      </form>

      <hr />

      {loading && <p>Loading...</p>}

      {!loading && expenses.length === 0 && (
        <p style={{ textAlign: "center", color: "#777" }}>
          No expenses yet
        </p>
      )}

      {!loading && expenses.length > 0 && (
        <ul className="expense-list">
          {expenses.map((e) => {
            const date = new Date(e.created_at).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });

            return (
              <li key={e.id} className="expense-item">
                <div>
                  <div className="description">{e.description || "—"}</div>
                  <div className="date">{date}</div>
                </div>
                <span className="amount">₹{e.amount}</span>
              </li>
            );
          })}
        </ul>

      )}
    </div>
  );
}

export default App;
