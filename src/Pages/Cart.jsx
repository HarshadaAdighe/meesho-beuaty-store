function Cart(props) {
  const subtotal = props.cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const grandTotal = subtotal;

  if (props.cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty. Start shopping! 🛍️</h2>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1>Your Shopping Cart</h1>

      <div className="cart-items">
        {props.cart.map((product) => (
          <div key={product.id} className="cart-item">
            <h2>{product.name}</h2>

            <p>Price: ₹{product.price}</p>

            <div className="quantity-controls">
              <button
                type="button"
                onClick={() => props.decreaseQuantity(product.id)}
                disabled={product.quantity <= 1}
                aria-label={`Decrease quantity of ${product.name}`}
              >
                −
              </button>

              <span>{product.quantity}</span>

              <button
                type="button"
                onClick={() => props.increaseQuantity(product.id)}
                aria-label={`Increase quantity of ${product.name}`}
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={() => props.onRemoveItem(product.id)}
            >
              Remove 🗑️
            </button>

            <p>Size: {product.size}</p>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <p>Subtotal: ₹{subtotal}</p>

        <h2>Grand Total: ₹{grandTotal}</h2>

        <button className="checked-out" type="button">
          Check Out
        </button>
      </div>

      <button type="button" onClick={props.clearCart}>
        Clear Cart 🗑️
      </button>
    </div>
  );
}

export default Cart;
