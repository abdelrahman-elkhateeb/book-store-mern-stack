const express = require("express");
const router = express.Router();

const {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
} = require("./book.controller");

// GET all books

//post = when submit smth from frontend
//get = when get smth from dv
//put/patch = when edit or update smth
//delete = when delete smth

router.post("/create-book", postABook);
router.get("/", getAllBooks);
router.get("/:id", getSingleBook);
router.put("/edit/:id", updateBook);
router.delete("/delete/:id", deleteBook);
module.exports = router;
