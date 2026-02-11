import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

function Home({ books, onUpdate }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>

      <div className="list-books-content">
        <BookShelf
          title="Currently Reading"
          books={books.filter((b) => b.shelf === "currentlyReading")}
          onUpdate={onUpdate}
        />
        <BookShelf
          title="Want to Read"
          books={books.filter((b) => b.shelf === "wantToRead")}
          onUpdate={onUpdate}
        />
        <BookShelf
          title="Read"
          books={books.filter((b) => b.shelf === "read")}
          onUpdate={onUpdate}
        />
      </div>

      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default Home;
