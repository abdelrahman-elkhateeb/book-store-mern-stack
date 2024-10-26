const express = require("express");
const router = express.Router();

const { postABook, getAllBooks } = require("./book.controller");

// GET all books

//post = when submit smth from frontend
//get = when get smth from dv
//put/patch = when edit or update smth
//delete = when delete smth

router.post("/create-book", postABook);
router.get("/get-books", getAllBooks);

module.exports = router;
