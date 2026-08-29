const http = require("http");

const products = [
  {
    id: 1,
    name: "Classic Black Blazer",
    category: "Men",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Luxury Black Dress",
    category: "Women",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Premium White Shirt",
    category: "Men",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Elegant Evening Dress",
    category: "Women",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Luxury Men's Watch",
    category: "Accessories",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Luxury Handbag",
    category: "Accessories",
    price: 2799,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    name: "Classic Black Sneakers",
    category: "Men",
    price: 2199,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    name: "Luxury Sunglasses",
    category: "Accessories",
    price: 1799,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 9,
    name: "Silk Premium Blouse",
    category: "Women",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1564257577054-4e3f4e8c6d9f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 10,
    name: "Luxury Black T-Shirt",
    category: "Men",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 11,
    name: "Premium Heels",
    category: "Women",
    price: 2799,
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 12,
    name: "Luxury Leather Belt",
    category: "Accessories",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=80",
  },
];

const users = [];
const orders = [];

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  res.end(JSON.stringify(data));
}

function getBody(req) {
  return new Promise((resolve) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    sendJSON(res, 200, { message: "OK" });
    return;
  }

  // Home
  if (req.url === "/" && req.method === "GET") {
    sendJSON(res, 200, {
      message: "AMU Backend is running successfully",
    });
    return;
  }

  // Products
  if (req.url === "/api/products" && req.method === "GET") {
    sendJSON(res, 200, products);
    return;
  }

  // Register
  if (req.url === "/api/register" && req.method === "POST") {
    const body = await getBody(req);

    const { name, email, password } = body;

    if (!name || !email || !password) {
      sendJSON(res, 400, {
        message: "Please fill all fields",
      });
      return;
    }

    const existingUser = users.find(
      (user) => user.email === email
    );

    if (existingUser) {
      sendJSON(res, 400, {
        message: "User already exists",
      });
      return;
    }

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
    };

    users.push(newUser);

    sendJSON(res, 201, {
      message: "Registration successful",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });

    return;
  }

  // Login
  if (req.url === "/api/login" && req.method === "POST") {
    const body = await getBody(req);

    const { email, password } = body;

    const user = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (!user) {
      sendJSON(res, 401, {
        message: "Invalid email or password",
      });
      return;
    }

    sendJSON(res, 200, {
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

    return;
  }

  // Create order
  if (req.url === "/api/orders" && req.method === "POST") {
    const body = await getBody(req);

    const { user, items, total, address } = body;

    if (!user || !items || items.length === 0 || !address) {
      sendJSON(res, 400, {
        message: "Invalid order details",
      });
      return;
    }

    const order = {
      id: orders.length + 1,
      user,
      items,
      total,
      address,
      date: new Date().toISOString(),
    };

    orders.push(order);

    sendJSON(res, 201, {
      message: "Order placed successfully",
      order,
    });

    return;
  }

  // User orders
  if (
    req.url.startsWith("/api/orders/") &&
    req.method === "GET"
  ) {
    const email = decodeURIComponent(
      req.url.split("/api/orders/")[1]
    );

    const userOrders = orders.filter(
      (order) => order.user.email === email
    );

    sendJSON(res, 200, userOrders);
    return;
  }

  sendJSON(res, 404, {
    message: "Route not found",
  });
});

server.listen(5000, () => {
  console.log(
    "Backend server running on http://localhost:5000"
  );
});