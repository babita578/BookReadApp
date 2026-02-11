import { Link } from "react-router-dom";
import { useState } from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

function Search({ books, onUpdate }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleUpdateBook = (book, shelf) => {
    onUpdate(book, shelf);

    setResults((prevResults) =>
      prevResults.map((b) =>
        b.id === book.id ? { ...b, shelf } : b
      )
    );
  };
  const handleSearch = async (q) => {
    setQuery(q);

    if (!q.trim()) {
      setResults([]);
      return;
    }

    const res = await BooksAPI.search(q);

    if (!res || res.error) {
      setResults([]);
      return;
    }

    const merged = res.map((book) => {
      const match = books.find((b) => b.id === book.id);
      return match ? match : book;
    });

    setResults(merged);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>

        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="search-books-results">
        <ol className="books-grid">
          {results.map((book) => (
            <Book key={book.id} book={book} onUpdate={handleUpdateBook} />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Search;
