const express = require("express");
const {
  addBooks,
  getBooks,
  editBook,
  deleteBook,
} = require("../controller/crud");

const route = express.Router();

const getBookRoute = route.get("/books", getBooks);
const addRoute = route.post("/books/add", addBooks);
const editBookRoute = route.put("/books/edit", editBook);
const deleteBookRoute = route.delete("/books/delete", deleteBook);

module.exports = { addRoute, getBookRoute, editBookRoute, deleteBookRoute };
