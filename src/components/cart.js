export default function Cart({ cart, onRemoveFromCart, onCheckout }) {
  return (
    <ul className="list list--solid">
      <li className="list__header">Your Cart</li>
      {cart.length ? (
        cart.map((item) => {
          return (
            <li key={item.id} className="list__item cart-item">
              <span>
                {item.title} ${item.price}
              </span>

              <button
                className="btn remove-from"
                onClick={() => onRemoveFromCart(item)}
              >
                <i className="material-icons">clear</i>
              </button>
            </li>
          );
        })
      ) : (
        <p> Currently there are no items in your cart!</p>
      )}
      {cart.length > 0 && (
        <button className="btn btn--tertiary checkout-btn" onClick={onCheckout}>
          Checkout
        </button>
      )}
    </ul>
  );
}
