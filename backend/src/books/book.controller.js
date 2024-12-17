const Book = require("./book.model");

const postABook = async (req, res) => {
  try {
    console.log(req.body);

    const newBook = await Book({ ...req.body });
    await newBook.save();
    res
      .status(200)
      .send({ message: "book posted successfully", book: newBook });
  } catch (err) {
    console.error("error creating a book", err);
    res.status(500).json({ message: "failed to create a book" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (err) {
    console.error("error getting books", err);
    res.status(500).send({ message: "failed to get books" });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "book not found" });
    }
    res.status(200).send(book);
  } catch (err) {
    console.error("error getting book", err);
    res.status(500).send({ message: "failed to get book" });
  }
};

const updateBook = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error updating a book", error);
    res.status(500).send({ message: "Failed to update a book" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).send({ message: "book not found" });
    }
    res
      .status(200)
      .send({ message: "book deleted successfully", book: deletedBook });
  } catch (err) {
    console.error("error deleting book", err);
    res.status(500).send({ message: "failed to delete book" });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
