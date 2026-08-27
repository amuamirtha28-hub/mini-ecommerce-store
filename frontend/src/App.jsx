import "./App.css";

function App() {
  const products = [
    {
      id: 1,
      name: "Classic Black Blazer",
      category: "Men",
      price: 2499,
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      name: "Luxury Black Dress",
      category: "Women",
      price: 2999,
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "Premium White Shirt",
      category: "Men",
      price: 1499,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      name: "Elegant Evening Dress",
      category: "Women",
      price: 3499,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      name: "Luxury Men's Watch",
      category: "Accessories",
      price: 3999,
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      name: "Luxury Handbag",
      category: "Accessories",
      price: 2799,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
    },
      {
    id: 7,
    name: "Classic Black Sneakers",
    price: 2199,
    category: "Men",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    name: "Luxury Sunglasses",
    price: 1799,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 9,
    name: "Silk Premium Blouse",
    price: 1999,
    category: "Women",
    image: "https://images.unsplash.com/photo-1564257577054-4e3f4e8c6d9f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 10,
    name: "Luxury Black T-Shirt",
    price: 999,
    category: "Men",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 11,
    name: "Premium Heels",
    price: 2799,
    category: "Women",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 12,
    name: "Luxury Leather Belt",
    price: 1299,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=80"
  }
];

return (
    <div className="store">
      <h1>NOIRÉ</h1>

      <p className="subtitle">
        LUXURY FASHION • MEN & WOMEN
      </p>

      <div className="products">
        {products.map((product) => (
          <div className="product-card" key={product.id}>

            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />

            <p className="category">{product.category}</p>

            <h2>{product.name}</h2>

            <p className="price">
              ₹{product.price}
            </p>

            <button>Add to Cart</button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
