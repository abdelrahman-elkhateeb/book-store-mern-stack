const express = require("express");
const Book = require("./book.model");
const router = express.Router();

// GET all books

//post = when submit smth from frontend
//get = when get smth from dv
//put/patch = when edit or update smth
//delete = when delete smth

router.post("/create-book", async (req, res) => {
  try {
    console.log(req.body);
    
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res
      .status(200)
      .send({ message: "book posted successfully", book: newBook });
  } catch (err) {
    console.error("error creating a book", err);
    res.status(500).json({ message: "failed to create a book"});
  }
});

module.exports = router;
