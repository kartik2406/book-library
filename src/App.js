import { findAllByTitle } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import "./App.css";
import BookList from "./components/bookList";
import Cart from "./components/cart";
import Checkout from "./components/checkout";
import Header from "./components/header";
import Search from "./components/search";
import SortSelector from "./components/sortSelector";
import * as util from "./util";

const SORT_OPTIONS = [
  {
    display: "Book ID",
    key: "bookID",
  },
  {
    display: "Title",
    key: "title",
  },
  {
    display: "Price",
    key: "price",
  },
  {
    display: "Rating",
    key: "average_rating",
  },
  {
    display: "Number of ratings",
    key: "ratings_count",
  },

  {
    display: "Authors",
    key: "authors",
  },
  {
    display: "Language",
    key: "language_code",
  },
  {
    display: "ISBN",
    key: "isbn",
  },
];

function App() {
  const [books, setBooks] = useState([]);
  const [sortColumn, setSortColumn] = useState("bookID");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [cart, setCart] = useState([]);
  const [appState, setAppState] = useState(false);
  useEffect(() => {
    //TODO: refactor
    async function fetchBooks(params) {
      let count = await util.getBookCount();
      console.log("Count", count);
      if (!count) {
        fetch(
          "https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json"
        )
          .then((res) => res.json())
          .then(async (res) => {
            await util.populateDB(res);
            setBooks(await util.getBooks());
          });
      } else {
        try {
          let books = await util.getBooks();
          setBooks(books);
        } catch (err) {
          console.log("Error reading data", err);
        }
      }
    }
    fetchBooks();
  }, []);

  // Whenever sortColumn or sortOrder changes fetch data from db
  useEffect(() => {
    async function onSortChange() {
      console.log("Sort order changed");
      let books = await util.getBooks(sortColumn, sortOrder);
      console.log("Books", books);
      setBooks(books);
    }
    onSortChange();
  }, [sortColumn, sortOrder]);

  function onChangeSortColumn(event) {
    let selectedOrder = event.target.value;

    setSortColumn(selectedOrder);
  }

  function onChangeSortOrder(event) {
    setSortOrder(event.target.value);
  }

  function onSearch(event) {
    let keyword = event.target.value;
    setSearchKeyword(keyword);
    console.log();
  }

  useEffect(() => {
    async function onSearchKeyword(params) {
      let books;
      if (searchKeyword)
        books = await util.searchBooks(searchKeyword, sortColumn, sortOrder);
      else books = await util.getBooks(sortColumn, sortOrder);
      setBooks(books);
    }

    onSearchKeyword();
  }, [searchKeyword]);

  function onAddToCart(currentBook) {
    setCart([
      ...cart,
      {
        id: currentBook.bookID,
        title: currentBook.title,
        price: currentBook.price,
      },
    ]);
    let newBooks = [...books];
    let book = newBooks.find((b) => b.bookID == currentBook.bookID);
    book.isInCart = true;
    setBooks(newBooks);
  }
  function onRemoveFromCart(currentItem) {
    let newCart = cart.filter((item) => item.id != currentItem.id);
    setCart(newCart);
    let newBooks = [...books];
    let book = newBooks.find((b) => b.bookID == currentItem.id);
    book.isInCart = false;
    setBooks(newBooks);
  }

  function onCheckout() {
    console.log("checking out");
    setAppState(!appState);
  }

  function onPay() {
    setAppState(!appState);
    setCart([]);
    let newbooks = books.map((book) => {
      book.isInCart = false;
      return book;
    });
    setBooks(books);
    alert("Thank you for your purchase. We keep adding cool stuff!");
  }
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        {appState ? (
          <Checkout
            cart={cart}
            onRemoveFromCart={onRemoveFromCart}
            onCheckout={onCheckout}
            onPay={onPay}
          />
        ) : (
          <div className="content">
            <div className="content__main">
              <Search onSearch={onSearch} />
              <SortSelector
                sortOptions={SORT_OPTIONS}
                sortColumn={sortColumn}
                onChangeSortColumn={onChangeSortColumn}
                sortOrder={sortOrder}
                onChangeSortOrder={onChangeSortOrder}
              />
              <BookList books={books} onAddToCart={onAddToCart} />
            </div>
            <div className="content__aside">
              <Cart
                cart={cart}
                onRemoveFromCart={onRemoveFromCart}
                onCheckout={onCheckout}
              />
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default App;
