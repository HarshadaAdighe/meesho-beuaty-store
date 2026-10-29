import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Cart from "./Pages/Cart";
import Productcard from "./Components/Productcard";
import products from "./data/Product.js";
import "./App.css";
import ProductSkeleton from "./Components/ProductSkeleton.jsx";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || [],
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const retryLoading = () => {
    setIsError(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const increaseQuantity = (productId) => {
    setCart((previousCart) =>
      previousCart.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        } else {
          return product;
        }
      }),
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((previousCart) =>
      previousCart.map((product) => {
        if (product.id === productId) {
          if (product.quantity > 1) {
            return {
              ...product,
              quantity: product.quantity - 1,
            };
          } else {
            return product;
          }
        } else {
          return product;
        }
      }),
    );
  };

  function addToCart(product) {
    const existingProduct = cart.find(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (existingProduct) {
      setCart(
        cart.map((cartProduct) =>
          cartProduct.id === product.id
            ? {
                ...cartProduct,
                quantity: cartProduct.quantity + 1,
              }
            : cartProduct,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  const removeItemFromCart = (productId) => {
    setCart((previousCart) =>
      previousCart.filter((product) => product.id !== productId),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim());

    return matchesCategory && matchesSearch;
  });

  const cartCount = cart.reduce((acc, product) => acc + product.quantity, 0);

  return (
    <BrowserRouter>
      <h1 className="top-h">meesho that defines beauty 💅🏼</h1>

      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartCount={cartCount}
      />

      <div className="app">
        <button onClick={() => setSelectedCategory("All")}>All</button>
        <button onClick={() => setSelectedCategory("Makeup")}>Makeup</button>
        <button onClick={() => setSelectedCategory("Haircare")}>
          Haircare
        </button>
        <button onClick={() => setSelectedCategory("Skincare")}>
          Skincare
        </button>
        <button onClick={() => setSelectedCategory("Fragrance")}>
          Fragrance
        </button>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <div className="products-grid">
              {isError ? (
                <>
                  <p>Something went wrong. Please try again.</p>
                  <button onClick={retryLoading}>Try again</button>
                </>
              ) : isLoading ? (
                [1, 2, 3, 4].map((item) => <ProductSkeleton key={item} />)
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Productcard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
          }
        />

        <Route path="/skincare" element={<h1>Skincare</h1>} />
        <Route path="/makeup" element={<h1>Makeup</h1>} />
        <Route path="/haircare" element={<h1>Haircare</h1>} />
        <Route path="/fragrance" element={<h1>Fragrance</h1>} />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              onRemoveItem={removeItemFromCart}
              clearCart={clearCart}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
