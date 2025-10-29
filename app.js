// app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// ✅ Enable CORS so frontend can call this API
app.use(cors({
  origin: "*", // You can replace "*" with your GitHub frontend URL later for more security
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(bodyParser.json());

// ✅ Example bundles data (you can connect to database later)
const bundles = [
  { id: 1, name: "Daily 200MB", price: "Ksh 20", data: "200MB" },
  { id: 2, name: "Weekly 1GB", price: "Ksh 100", data: "1GB" },
  { id: 3, name: "Monthly 5GB", price: "Ksh 400", data: "5GB" },
];

// ✅ Route: Get all bundles
app.get("/api/bundles", (req, res) => {
  res.json(bundles);
});

// ✅ Route: Handle bundle purchase
app.post("/api/buy", (req, res) => {
  const { bundleName, price } = req.body;

  if (!bundleName || !price) {
    return res.status(400).json({ message: "Missing bundle details." });
  }

  console.log(`✅ Purchase received: ${bundleName} at ${price}`);

  res.json({
    success: true,
    message: `You successfully bought ${bundleName} for ${price}.`
  });
});

// ✅ Auto-detect Render port or use 5000 locally
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://127.0.0.1:${PORT}`);
});
