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
    const books = await Book.find({});
    res.status(200).send(books);
  } catch (err) {
    console.error("error getting books", err);
    res.status(500).json({ message: "failed to get books" });
  }
};

module.exports = {
  postABook,
  getAllBooks,
};