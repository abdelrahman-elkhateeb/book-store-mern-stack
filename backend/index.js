const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db.js");
const bookRoutes = require("./src/books/book.route");

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://book-store-mern-stack-frontend-five.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(helmet());
app.use(express.json());

// Connect to Database and Start Server
connectDB()
  .then(() => {
    app.use("/api/books", bookRoutes);

    // Health Check
    app.get("/health", async (req, res) => {
      try {
        await mongoose.connection.db.admin().ping();
        res.status(200).json({ status: "Database is connected" });
      } catch (error) {
        res
          .status(500)
          .json({ status: "Database connection failed", error: error.message });
      }
    });

    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running...");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });
