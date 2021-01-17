export default function Search({ onSearch }) {
  return (
    <form action="" className="form">
      <div className="form__input">
        <input
          type="text"
          id="name"
          placeholder="Search using book title, authors"
          onChange={onSearch}
        />
        <label htmlFor="name">Search</label>
      </div>
    </form>
  );
}
