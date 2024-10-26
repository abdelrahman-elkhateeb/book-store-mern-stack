const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5000;
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//middleware
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

//route
const bookRoutes = require("./src/books/book.route");
app.use("/api/books", bookRoutes);

main()
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
