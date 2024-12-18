const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS Configuration
// app.use(
//   cors({
//     origin: "https://book-store-mern-stack-frontend-five.vercel.app",
//     credentials: true,
//   }),
// );

// MongoDB Connection
async function connectToDB() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

// Routes
const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.get("/", (res, req) => res.status(200).json({ message: "mocha was here" }));
// app.use("/api/books", bookRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/auth", userRoutes);
// app.use("/api/admin", adminRoutes);

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Backend is running fine!" });
});

// Start Server
app.listen(5000, () => {
  console.log(
    "Server is running on port 5000 \n\n\n\n\n\n\n\n\n\n\n a3333333333333333333333333",
  );
});

// connectToDB().then(() => {
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });
// });
