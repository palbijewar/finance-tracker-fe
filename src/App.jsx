import { useEffect, useState } from "react";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "./api";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    const data = await getExpenses();
    setExpenses(data);
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      await updateExpense(editingId, {
        amount: Number(amount),
        description,
      });
      setEditingId(null);
    } else {
      await createExpense({
        amount: Number(amount),
        description,
        idempotencyKey: Date.now().toString(),
      });
    }

    setAmount("");
    setDescription("");
    loadExpenses();
  }

  async function confirmDelete() {
    if (!deleteId) return;

    await deleteExpense(deleteId);
    setDeleteId(null);
    loadExpenses();
  }


  function handleEdit(expense) {
    setEditingId(expense.id);
    setAmount(expense.amount);
    setDescription(expense.description);
  }

  return (
    <div className="app-container">
      <h2>Expense Tracker</h2>

      <form onSubmit={handleSubmit} className="expense-form">
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

        <button type="submit">
          {editingId ? "Update Expense" : "Add Expense"}
        </button>
      </form>

      {loading && <p className="center">Loading...</p>}

      {!loading && expenses.length === 0 && (
        <p className="center muted">No expenses yet</p>
      )}

      <ul className="expense-list">
        {expenses.map((e) => {
          const date = new Date(e.created_at).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });

          return (
            <li key={e.id} className="expense-item">
              <div className="expense-info">
                <div className="description">{e.description || "—"}</div>
                <div className="meta">
                  <span className="date">{date}</span>
                  <span className="category">{e.category}</span>
                </div>
              </div>

              <div className="expense-actions">
                <span className="amount">₹{e.amount}</span>
                <button onClick={() => handleEdit(e)}>✏️</button>
                <button onClick={() => setDeleteId(e.id)}>🗑️</button>
              </div>
            </li>
          );
        })}
      </ul>
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Delete Expense</h3>
            <p>Are you sure you want to delete this expense?</p>

            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button className="btn-delete" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
