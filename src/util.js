import Dexie from "dexie";
const db = new Dexie("bookRepo");
db.version(1).stores({
  books: "++bookID, title, authors, isbn, language_code, ratings_count, price",
});
const booksTable = db.table("books");
export async function populateDB(books) {
  return await booksTable.bulkAdd(books);
}

export async function getBookCount() {
  return await booksTable.count();
}

export async function getBooks(
  sortColumn = "bookID",
  sortDirection = "ASC",
  limit = 200,
  skip = 0
) {
  if (sortDirection == "ASC") {
    return await booksTable.orderBy(sortColumn).limit(limit).toArray();
  }
  return await booksTable.orderBy(sortColumn).limit(limit).reverse().toArray();
}

export async function searchBooks(
  keyword,
  sortColumn = "bookID",
  sortDirection = "ASC",
  limit = 200,
  skip = 0
) {
  //   let result = await Promise.all([
  //     books
  //       .where("title")
  //       .startsWithIgnoreCase(keyword)
  //       .orderBy(sortColumn)
  //       .limit(limit)
  //       .toArray(),
  //     books
  //       .where("isbn")
  //       .equals(parseInt(keyword))
  //       .orderBy(sortColumn)
  //       .limit(limit)
  //       .toArray(),
  //     books
  //       .where("authors")
  //       .startsWithIgnoreCase(keyword)
  //       .orderBy(sortColumn)
  //       .limit(limit)
  //       .toArray(),
  //   ]);
  //   console.log(result.flatMap((val) => val));
  return await booksTable
    .where("title")
    .startsWithIgnoreCase(keyword)
    .or("authors")
    .startsWithIgnoreCase(keyword)
    .limit(limit)
    .sortBy(sortColumn);

  // .limit(limit);
}

function convertToString(value) {
  if (value.toString) value = value.toString();
  return value;
}
