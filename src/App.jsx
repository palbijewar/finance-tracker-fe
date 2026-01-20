import { useEffect, useState } from "react";
import { getExpenses } from "./api";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    loadExpenses();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Expense Tracker</h2>

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
