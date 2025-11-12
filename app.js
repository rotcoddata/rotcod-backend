// app.js — Rotcod Backend
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Default route
app.get("/", (req, res) => {
  res.send("✅ Rotcod Backend is running successfully!");
});

// ✅ Data bundles endpoint
app.get("/api/bundles", (req, res) => {
  const bundles = [
    { id: 1, name: "Daily 500MB", price: 50, duration: "1 Day" },
    { id: 2, name: "Weekly 2GB", price: 200, duration: "7 Days" },
    { id: 3, name: "Monthly 5GB", price: 500, duration: "30 Days" },
    { id: 4, name: "Unlimited (1 Week)", price: 700, duration: "7 Days" },
    { id: 5, name: "Night Bundle 1GB", price: 100, duration: "Night Only" },
  ];
  res.json(bundles);
});

// ✅ Handle customer purchase (simulated)
app.post("/api/buy", (req, res) => {
  const { bundleName, price, fee, profit } = req.body;
  console.log("💳 New Purchase:", { bundleName, price, fee, profit });
  res.json({ success: true, message: "Purchase recorded successfully" });
});

// ✅ Secure Admin login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Your real admin credentials
  const adminUser = "admin";
  const adminPass = "1234";

  if (username === adminUser && password === adminPass) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// ✅ Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Rotcod backend running on port ${PORT}`));
