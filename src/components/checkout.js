export default function Checkout({
  cart,
  onRemoveFromCart,
  onCheckout,
  onPay,
}) {
  return (
    <ul className="list list--solid">
      <li className="list__header">Items in your cart</li>
      {cart.map((item) => {
        return (
          <li key={item.id} className="list__item cart-item checkout-item">
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
      })}
      <li className="list__item cart-item checkout-item">
        Total ammount: {cart.reduce((prev, curr) => prev + curr.price, 0)}
      </li>
      <button className="btn btn--primary checkout-btn" onClick={onPay}>
        Pay and continue
      </button>
      <button className="btn btn--tertiary checkout-btn" onClick={onCheckout}>
        Go back
      </button>
    </ul>
  );
}
