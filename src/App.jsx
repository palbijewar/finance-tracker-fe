import { useEffect, useState } from "react";
import { getExpenses, createExpense } from "./api";

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
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Expense Tracker</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit">Add Expense</button>
      </form>

      <hr />

      {loading && <p>Loading...</p>}

      {!loading && expenses.length === 0 && <p>No expenses yet</p>}

      {!loading && expenses.length > 0 && (
        <ul>
          {expenses.map((e) => (
            <li key={e.id}>
              ₹{e.amount} — {e.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
