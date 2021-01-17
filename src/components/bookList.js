import Book from "./book";

export default function BookList({ books, onAddToCart }) {
  return (
    <ul className="list books">
      {books.map((book) => {
        return <Book key={book.bookID} book={book} onAddToCart={onAddToCart} />;
      })}
    </ul>
  );
}
