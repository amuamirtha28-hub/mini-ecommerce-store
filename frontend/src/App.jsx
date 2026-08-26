import { useState } from "react";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const products = [
    { id: 1, name: "T-Shirt", price: 499 },
    { id: 2, name: "Sneakers", price: 1499 },
    { id: 3, name: "Backpack", price: 899 },
  ];

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

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

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

  const removeItem = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = (event) => {
    event.preventDefault();
    setOrderPlaced(true);
    setShowCheckout(false);
    setCart([]);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial", textAlign: "center" }}>
      <h1>Mini E-Commerce Store</h1>

      <p>Welcome to my store!</p>

      <h2>Products</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              width: "250px",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              background: "white",
            }}
          >
            <h2>{product.name}</h2>

            <h3>₹{product.price}</h3>

            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>🛒 Shopping Cart</h2>

        <h3>Items in cart: {totalItems}</h3>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  margin: "20px auto",
                  maxWidth: "500px",
                  padding: "15px",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <h3>{item.name}</h3>

                <p>
                  ₹{item.price} × {item.quantity}
                </p>

                <button onClick={() => decreaseQuantity(item.id)}>
                  −
                </button>

                <span style={{ margin: "0 15px" }}>
                  {item.quantity}
                </span>

                <button onClick={() => increaseQuantity(item.id)}>
                  +
                </button>

                <button
                  onClick={() => removeItem(item.id)}
                  style={{ marginLeft: "15px" }}
                >
                  Remove
                </button>
              </div>
            ))}

            <h2>Total: ₹{totalPrice}</h2>

            <button
              onClick={() => setShowCheckout(true)}
              style={{
                padding: "12px 25px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Checkout
            </button>
          </>
        )}
      </div>

      {showCheckout && (
        <div
          style={{
            margin: "40px auto",
            maxWidth: "500px",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            background: "#f8f8f8",
          }}
        >
          <h2>Checkout</h2>

          <form onSubmit={handleCheckout}>
            <input
              type="text"
              placeholder="Full Name"
              required
              style={inputStyle}
            />

            <input
              type="tel"
              placeholder="Phone Number"
              required
              style={inputStyle}
            />

            <textarea
              placeholder="Delivery Address"
              required
              style={{ ...inputStyle, height: "80px" }}
            />

            <select required style={inputStyle}>
              <option value="">Select Payment Method</option>
              <option value="cod">Cash on Delivery</option>
              <option value="upi">UPI</option>
              <option value="card">Credit / Debit Card</option>
            </select>

            <button
              type="submit"
              style={{
                padding: "12px 25px",
                marginRight: "10px",
              }}
            >
              Place Order
            </button>

            <button
              type="button"
              onClick={() => setShowCheckout(false)}
              style={{ padding: "12px 25px" }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {orderPlaced && (
        <div
          style={{
            margin: "30px auto",
            padding: "20px",
            maxWidth: "500px",
            borderRadius: "10px",
            background: "#e8f5e9",
          }}
        >
          <h2>🎉 Order Placed Successfully!</h2>
          <p>Thank you for shopping with us.</p>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "90%",
  padding: "12px",
  margin: "12px auto",
  fontSize: "16px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

export default App;
