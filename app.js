const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const { Parser } = require("json2csv");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ Temporary in-memory data (replace with DB later)
let purchases = [
  {
    name: "John Doe",
    phone: "+254712345678",
    bundle: "Bundle B",
    price: 2,
    transactionId: "TXN123456",
    timestamp: new Date().toLocaleString(),
  },
];

// ✅ Serve frontend files (optional for hosting all together)
app.use(express.static(path.join(__dirname, "../frontend")));

// ✅ Get all purchases
app.get("/api/purchases", (req, res) => {
  res.json(purchases);
});

// ✅ Add new purchase (when customer buys)
app.post("/api/purchase", (req, res) => {
  const { name, phone, bundle, price } = req.body;
  const transactionId = "TXN" + Date.now();
  const timestamp = new Date().toLocaleString();

  const purchase = { name, phone, bundle, price, transactionId, timestamp };
  purchases.push(purchase);
  console.log("✅ New purchase:", purchase);

  res.json({ success: true, message: "Purchase saved", transactionId, timestamp });
});

// ✅ Export purchases as CSV
app.get("/api/export", (req, res) => {
  try {
    if (purchases.length === 0) {
      return res.status(400).json({ message: "No purchases to export" });
    }

    const fields = ["name", "phone", "bundle", "price", "transactionId", "timestamp"];
    const parser = new Parser({ fields });
    const csv = parser.parse(purchases);

    const filePath = path.join(__dirname, "purchases.csv");
    fs.writeFileSync(filePath, csv);

    res.download(filePath, "purchases.csv", (err) => {
      if (err) console.error("❌ Download error:", err);
      fs.unlinkSync(filePath); // clean up
    });
  } catch (error) {
    console.error("❌ CSV Export failed:", error);
    res.status(500).json({ message: "Error exporting CSV" });
  }
});

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Rotcod Data Backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://127.0.0.1:${PORT}`);
});
