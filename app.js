// app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Default route (homepage)
app.get("/", (req, res) => {
  res.send("✅ Rotcod Backend is running successfully on Render!");
});

// ✅ Bundles endpoint
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

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Rotcod Backend running on port ${PORT}`);
});
