export default function Book({ book, onAddToCart }) {
  return (
    <li className="list__item">
      <div className="card book">
        <div className="card__header">{book.title}</div>
        <div className="card__body">
          <span className="book-fields" title="Authors">
            <i className="material-icons">groups</i> {book.authors}
          </span>

          <span className="book-fields" title="Language Code">
            <i className="material-icons">language</i> {book.language_code}
          </span>
          <span className="book-fields" title="ISBN">
            <i className="material-icons">code</i> {book.isbn}
          </span>

          <span className="book-fields" title="Rating">
            <i className="material-icons">star_border</i>
            <span className="rating-stars">
              {!isNaN(book.average_rating) &&
                new Array(Math.floor(book.average_rating))
                  .fill(" ")
                  .map((_, index) => (
                    <i key={index} className="material-icons">
                      star
                    </i>
                  ))}
            </span>
          </span>

          <span className="book-fields" title="Number of reviews">
            <i className="material-icons">person</i> {book.ratings_count}
          </span>

          <span className="book-fields" title="Price">
            <i className="material-icons">attach_money</i> {book.price}
          </span>
          {book.isInCart ? (
            <p className="add-to-cart">Book in cart</p>
          ) : (
            <button
              className="btn btn--solid-tertiary btn--round add-to-cart"
              onClick={() => onAddToCart(book)}
            >
              <i className="material-icons">add_shopping_cart</i>
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
