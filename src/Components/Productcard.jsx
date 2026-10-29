function Productcard(props) {
  return (
    <div className="product-card">
      <h1 className="product-name">{props.product.name}</h1>

      <img
        className="product-image"
        src={props.product.image}
        alt={props.product.name}
      />

      <p>Price: ₹{props.product.price}</p>
      <p>Category: {props.product.category}</p>
      <p>{props.product.description}</p>
      <p>Rating: {props.product.rating}</p>

      <p>Quantity: {props.product.quantity}</p>
      <p>Size: {props.product.size}</p>

      <button onClick={() => props.onAddToCart(props.product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default Productcard;
