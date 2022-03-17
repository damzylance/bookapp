const fs = require("fs");
let bookList = JSON.parse(fs.readFileSync("src/books.json", "utf8"));
const getBooks = (req, res) => {
  res.status(200).json({ data: bookList });
};
const addBooks = (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(401).json({
      succes: false,
      message: "book name and author required",
    });
  }
  const book = { title: title, author: author };
  const bookExist = bookList.find((item) => {
    return item.title == book.title && item.author == book.author;
  });
  if (bookExist) {
    return res
      .status(201)
      .json({ succes: false, message: "book already exists already" });
  }
  bookList.push(book);
  fs.writeFileSync("src/books.json", JSON.stringify(bookList), (err) => {
    if (err) {
      console.log(err);
    }
  });
  return res.status(200).json({
    succes: true,
    data: book,
    message: "New Book Added Successfully",
  });
};
const editBook = (req, res) => {
  const { oldTitle, title, author } = req.body;
  const errors = [];
  if (!oldTitle) {
    errors.push("Please provide search value");
  }
  if (!title && !author) {
    errors.push("Please select values to change");
  }
  if (errors.length >= 1) {
    return res.status(201).json({ success: false, message: errors });
  }
  const bookExist = bookList.find((item) => {
    return item.title == oldTitle;
  });
  if (!bookExist) {
    return res
      .status(401)
      .json({ succes: false, message: "Book with title doesn't exist" });
  }
  for (let i = 0; i < bookList.length; i++) {
    if (bookList[i] === bookExist) {
      if (title) {
        bookList[i].title = title;
      }
      if (author) {
        bookList[i].author = author;
      }
    }
  }
  fs.writeFileSync("src/books.json", JSON.stringify(bookList), (err) => {
    if (err) {
      console.log(err);
    }
  });
  return res
    .status(200)
    .json({ success: true, message: "Book edited successfully " });
};

const deleteBook = (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res
      .status(201)
      .json({ succes: false, message: "Select book to delete" });
  }
  const bookExists = bookList.find((item) => {
    return item.title === title;
  });
  if (!bookExists) {
    return res
      .status(201)
      .json({ succes: false, message: "Book does not exist" });
  }
  bookList = bookList.filter((book) => {
    return book !== bookExists;
  });
  fs.writeFileSync("src/books.json", JSON.stringify(bookList), (err) => {
    if (err) console.log(err);
  });
  return res.status(200).json({ succes: true, data: bookList });
};

module.exports = { addBooks, getBooks, editBook, deleteBook };
