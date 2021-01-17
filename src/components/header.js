export default function Header() {
  return (
    <header className="navbar">
      <div className="navbar__app">
        <i className="material-icons navbar__logo">book</i>
        <h2 className="navbar__app__name">
          <a>BookRepo</a>
        </h2>
      </div>
      <section className="navbar__links">
        <a className="navbar__link link">About</a>
      </section>
    </header>
  );
}
