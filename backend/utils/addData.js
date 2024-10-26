const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Book = require("../src/books/book.model"); // Make sure the path to your model is correct
require("dotenv").config();

async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");

    // Read the JSON file
    const dataPath = path.join(__dirname, "../../frontend/public/books.json"); // Adjust the path if necessary

    const fileData = fs.readFileSync(dataPath, "utf-8");
    const books = JSON.parse(fileData);

    // Insert all the books into the database
    const result = await Book.insertMany(books);
    console.log(`${result.length} books added successfully!`);

    mongoose.connection.close();
  } catch (error) {
    console.error("Error importing books:", error);
  }
}

main();
