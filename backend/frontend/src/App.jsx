import { useEffect, useMemo, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showCheckout, setShowCheckout] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  // Get products from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item
  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  // Cart item count
  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // Cart total
  const cartTotal = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cart]);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Customer input
  const handleCustomerChange = (event) => {
    const { name, value } = event.target;

    setCustomer((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // Open checkout
  const openCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setShowCheckout(true);
  };

  // Place order
  const placeOrder = (event) => {
    event.preventDefault();

    if (
      !customer.name.trim() ||
      !customer.phone.trim() ||
      !customer.address.trim()
    ) {
      alert("Please fill in all customer details.");
      return;
    }

    setShowCheckout(false);
    setOrderPlaced(true);
    setCart([]);

    setCustomer({
      name: "",
      phone: "",
      address: "",
      payment: "Cash on Delivery",
    });
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <h1>AMU</h1>
          <p>LUXURY FASHION • MEN & WOMEN</p>
        </div>

        <div className="cart-button">
          🛒 Cart ({cartCount})
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h2>Luxury Fashion</h2>
          <p>Discover premium fashion for men and women.</p>

          <button
            onClick={() =>
              document
                .getElementById("products")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            SHOP NOW
          </button>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="products-section" id="products">

        <div className="section-heading">
          <h2>Premium styles selected for you</h2>
          <p>Find your perfect style</p>
        </div>

        {/* SEARCH */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {/* CATEGORIES */}
        <div className="categories">

          <button
            className={category === "All" ? "active" : ""}
            onClick={() => setCategory("All")}
          >
            All
          </button>

          <button
            className={category === "Men" ? "active" : ""}
            onClick={() => setCategory("Men")}
          >
            Men
          </button>

          <button
            className={category === "Women" ? "active" : ""}
            onClick={() => setCategory("Women")}
          >
            Women
          </button>

          <button
            className={category === "Accessories" ? "active" : ""}
            onClick={() => setCategory("Accessories")}
          >
            Accessories
          </button>

        </div>

        {/* PRODUCT GRID */}
        <div className="product-grid">

          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try another search or category.</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>

                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                <div className="product-info">

                  <div className="product-category">
                    {product.category}
                  </div>

                  <h3>{product.name}</h3>

                  <div className="price">
                    ₹{product.price.toLocaleString("en-IN")}
                  </div>

                  <button
                    className="add-cart"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>

                </div>
              </div>
            ))
          )}

        </div>
      </section>

      {/* CART */}
      <section className="cart-section">

        <div className="section-heading">
          <h2>Your Shopping Cart</h2>
          <p>{cartCount} item(s) in your cart</p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <h3>Your cart is empty 🛒</h3>
            <p>Add some products to continue shopping.</p>
          </div>
        ) : (
          <div className="cart-container">

            {/* CART ITEMS */}
            <div className="cart-items">

              {cart.map((item) => (
                <div className="cart-item" key={item.id}>

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-details">

                    <h3>{item.name}</h3>

                    <p>
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>

                    <div className="quantity">

                      <button
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>

                    </div>

                  </div>

                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>

                </div>
              ))}

            </div>

            {/* CART SUMMARY */}
            <div className="cart-summary">

              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Items</span>
                <span>{cartCount}</span>
              </div>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="summary-row">
                <span>Delivery</span>
                <span>FREE</span>
              </div>

              <div className="summary-row total">
                <span>Total</span>
                <span>
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                className="checkout-button"
                onClick={openCheckout}
              >
                Proceed to Checkout
              </button>

            </div>

          </div>
        )}

      </section>

      {/* CHECKOUT MODAL */}
      {showCheckout && (
        <div
          className="checkout-overlay"
          onClick={() => setShowCheckout(false)}
        >

          <div
            className="checkout-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <button
              className="close-checkout"
              onClick={() => setShowCheckout(false)}
            >
              ×
            </button>

            <h2>Checkout</h2>

            <p className="checkout-total">
              Total Amount: ₹{cartTotal.toLocaleString("en-IN")}
            </p>

            <form onSubmit={placeOrder}>

              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={customer.name}
                onChange={handleCustomerChange}
              />

              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={customer.phone}
                onChange={handleCustomerChange}
              />

              <label>Delivery Address</label>

              <textarea
                name="address"
                placeholder="Enter your full delivery address"
                value={customer.address}
                onChange={handleCustomerChange}
                rows="4"
              />

              <label>Payment Method</label>

              <select
                name="payment"
                value={customer.payment}
                onChange={handleCustomerChange}
              >
                <option value="Cash on Delivery">
                  Cash on Delivery
                </option>

                <option value="UPI">
                  UPI
                </option>

                <option value="Card">
                  Credit / Debit Card
                </option>
              </select>

              <button
                type="submit"
                className="place-order-button"
              >
                Place Order
              </button>

            </form>

          </div>

        </div>
      )}

      {/* SUCCESS MESSAGE */}
      {orderPlaced && (
        <div className="success-overlay">

          <div className="success-box">

            <div className="success-icon">✓</div>

            <h2>Order Placed Successfully!</h2>

            <p>
              Thank you for shopping with AMU.
            </p>

            <p>
              Your order will be processed soon.
            </p>

            <button
              onClick={() => setOrderPlaced(false)}
            >
              Continue Shopping
            </button>

          </div>

        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <h2>AMU</h2>
        <p>Luxury Fashion • Men & Women</p>
        <p>© 2026 AMU. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;