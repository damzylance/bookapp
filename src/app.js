const express = require("express");
const fs = require("fs");
const app = express();
const {
  addRoute,
  getBookRoute,
  editBookRoute,
  deleteBookRoute,
} = require("./routes/route");
let bookList = JSON.parse(fs.readFileSync("src/books.json", "utf8"));

app.use(express.json());

//get all books
// app.get("/books", (req, res) => {
//   res.status(200).json({ success: true, data: bookList });
// });

app.use(addRoute);
app.use(getBookRoute);
app.use(editBookRoute);
app.use(deleteBookRoute);

// //add new books
// app.post("/books/add", (req, res) => {
//   const { title, author } = req.body;
//   if (!title || !author) {
//     return res.status(200).json({
//       success: false,
//       message: "Please add book title and author",
//     });
//   }
//   const book = { title: title, author: author };
//   bookList.push(book);
//   console.log(book);
//   console.log(bookList);
//   fs.writeFileSync(
//     "src/books.json",
//     JSON.stringify(bookList),
//     "utf8",
//     (err) => {
//       if (err) {
//         console.log(err);
//       }
//     }
//   );
//   return res.status(200).json({ success: true, data: bookList });
// });

app.listen(5000, () => {
  console.log("app is running on port 5000");
});
