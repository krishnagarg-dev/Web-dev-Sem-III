
import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "https://dummyjson.com/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <h2>Loading Products...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>Product List</h1>

      {products.map((product) => (
        <div key={product.id}>
          <img
            src={product.thumbnail}
            alt={product.title}
            width="150"
          />
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <h4>${product.price}</h4>
        </div>
      ))}
    </div>
  );
}

export default Products;