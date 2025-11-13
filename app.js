const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Default route
app.get("/", (req, res) => {
  res.send("🚀 Rotcod Backend is running successfully!");
});

// ✅ Static Data Bundles
let bundles = [
  { id: 1, name: "Daily 500MB", price: 50, duration: "1 Day" },
  { id: 2, name: "Weekly 2GB", price: 200, duration: "7 Days" },
  { id: 3, name: "Monthly 5GB", price: 500, duration: "30 Days" },
  { id: 4, name: "Unlimited (1 Week)", price: 700, duration: "7 Days" },
  { id: 5, name: "Night Bundle 1GB", price: 100, duration: "Night Only" }
];

// ✅ Route: Get all bundles
app.get("/api/bundles", (req, res) => {
  res.json(bundles);
});

// ✅ Simulated transactions data
let transactions = [
  {
    id: "T001",
    customer: "John",
    phone: "0712345678",
    bundle: "Daily 500MB",
    price: 50,
    fee: 5,
    profit: 5,
    time: "2025-10-29 12:00"
  },
  {
    id: "T002",
    customer: "Amina",
    phone: "0798765432",
    bundle: "Weekly 2GB",
    price: 200,
    fee: 10,
    profit: 10,
    time: "2025-10-29 12:10"
  }
];

// ✅ Route: Record a new transaction
app.post("/api/buy", (req, res) => {
  const { bundleName, price, fee = 0, profit = 0 } = req.body;
  const newTransaction = {
    id: "T" + (transactions.length + 1).toString().padStart(3, "0"),
    customer: "Anonymous",
    phone: "N/A",
    bundle: bundleName,
    price,
    fee,
    profit,
    time: new Date().toLocaleString()
  };
  transactions.push(newTransaction);
  res.json({ success: true, message: "Transaction saved", data: newTransaction });
});

// ✅ Route: Get all transactions
app.get("/api/transactions", (req, res) => {
  res.json(transactions);
});

// ✅ Route: Admin login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Static admin credentials
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "rotcod123";

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// ✅ Start the server
app.listen(PORT, () => console.log(`✅ Rotcod Backend running on port ${PORT}`));
