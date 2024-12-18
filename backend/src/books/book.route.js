const express = require("express");
const router = express.Router();

const {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
} = require("./book.controller");
const verifyAdminToken = require("../middleware/verifyAdminToken");

// GET all books

//post = when submit smth from frontend
//get = when get smth from dv
//put/patch = when edit or update smth
//delete = when delete smth

router.get("/", getAllBooks);
router.post("/create-book", verifyAdminToken, postABook);
router.get("/:id", getSingleBook);
router.put("/edit/:id", verifyAdminToken, updateBook);
router.delete("/delete/:id", verifyAdminToken, deleteBook);
module.exports = router;
