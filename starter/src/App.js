import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";
import Home from "./Home";
import Search from "./Search";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then(setBooks);
  }, []);

  const updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      setBooks((prev) =>
        prev.map((b) =>
          b.id === book.id ? { ...b, shelf } : b
        )
      );
    });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Home books={books} onUpdate={updateBookShelf} />}
      />
      <Route
        path="/search"
        element={<Search books={books} onUpdate={updateBookShelf} />}
      />
    </Routes>
  );
}

export default App;
