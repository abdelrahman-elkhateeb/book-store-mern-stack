const catchAsync = require("../../utils/catchAsync");
const Book = require("./book.model");

//create a book
const postABook = catchAsync(async (req, res) => {
  const newBook = await Book({ ...req.body });
  await newBook.save();

  res.status(200).send({ message: "book posted successfully", book: newBook });
});

//get all books
const getAllBooks = catchAsync(async (req, res) => {
  const books = await Book.find({}).sort({ createdAt: -1 });
  res.status(200).send(books);
});

//get a book
const getSingleBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).send({ message: "book not found" });
  }

  res.status(200).send(book);
});

//update a book
const updateBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedBook) {
    res.status(404).send({ message: "Book is not Found!" });
  }

  res.status(200).send({
    message: "Book updated successfully",
    book: updatedBook,
  });
});

//delete a book
const deleteBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedBook = await Book.findByIdAndDelete(id);

  if (!deletedBook) {
    return res.status(404).send({ message: "book not found" });
  }

  res
    .status(200)
    .send({ message: "book deleted successfully", book: deletedBook });
});

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
