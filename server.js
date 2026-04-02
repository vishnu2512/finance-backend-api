const express = require("express");
const app = express();

app.use(express.json());

// Mock user
const mockUser = { role: "admin" };

// Role middleware
const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(mockUser.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
};

// In-memory data
let records = [
  {
    id: 1,
    amount: 1000,
    type: "income",
    category: "salary",
    date: "2026-04-02",
    notes: "salary"
  },
  {
    id: 2,
    amount: 400,
    type: "expense",
    category: "food",
    date: "2026-04-02",
    notes: "lunch"
  },
  {
    id: 3,
    amount: 200,
    type: "expense",
    category: "travel",
    date: "2026-04-02",
    notes: "bus"
  }
];

let id = 4;

// CREATE record
app.post("/records", authorize(["admin"]), (req, res) => {
  const { amount, type, category, date, notes } = req.body;

  // Validation
  if (
    typeof amount !== "number" ||
    amount <= 0 ||
    (type !== "income" && type !== "expense")
  ) {
    return res.status(400).json({
      error: "Invalid input: check amount and type"
    });
  }

  if (!category) {
    return res.status(400).json({
      error: "Category is required"
    });
  }

  const record = { id: id++, amount, type, category, date, notes };
  records.push(record);

  res.json(record);
});

// GET all records
app.get(
  "/records",
  authorize(["admin", "analyst", "viewer"]),
  (req, res) => {
    res.json(records);
  }
);

// UPDATE record
app.put("/records/:id", authorize(["admin"]), (req, res) => {
  const record = records.find((r) => r.id == req.params.id);

  if (!record) {
    return res.status(404).json({ error: "Record not found" });
  }

  const { amount, type, category, date, notes } = req.body;

  if (amount !== undefined) record.amount = amount;
  if (type !== undefined) record.type = type;
  if (category !== undefined) record.category = category;
  if (date !== undefined) record.date = date;
  if (notes !== undefined) record.notes = notes;

  res.json(record);
});

// DELETE record
app.delete("/records/:id", authorize(["admin"]), (req, res) => {
  const recordIndex = records.findIndex(r => r.id == req.params.id);

  if (recordIndex === -1) {
    return res.status(404).json({ error: "Record not found" });
  }

  const deletedRecord = records.splice(recordIndex, 1);

  res.json({
    message: "Record deleted successfully",
    record: deletedRecord[0]
  });
});

// DASHBOARD (only one, correct one)
app.get("/dashboard", authorize(["admin", "analyst"]), (req, res) => {
  let income = 0;
  let expense = 0;

  records.forEach((r) => {
    if (r.type === "income") income += r.amount;
    if (r.type === "expense") expense += r.amount;
  });

  res.json({
    totalIncome: income,
    totalExpense: expense,
    balance: income - expense
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));