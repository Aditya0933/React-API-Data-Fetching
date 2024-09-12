import express from "express";
import cors from "cors"; // Import the cors package

const app = express();

// Use the CORS middleware to enable cross-origin requests
app.use(cors());

app.get("/api/products", (req, resp) => {
  const products = [
    { id: 1, name: "table glass", price: 500 },
    { id: 2, name: "table", price: 540 },
    { id: 3, name: "table spoo", price: 50 },
    { id: 4, name: "table fan", price: 590 },
    { id: 5, name: "table lamp", price: 430 },
  ];

  if (req.query.search) {
    const filterProduct = products.filter((product) =>
      product.name.toLowerCase().includes(req.query.search.toLowerCase())
    );
    if (filterProduct.length === 0) {
      return resp.status(404).send({ message: "No products founds" });
    }
    return resp.send(filterProduct);
  }

  // Simulate a delay to test loading state in the frontend
  setTimeout(() => {
    resp.send(products);
  }, 2000);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
