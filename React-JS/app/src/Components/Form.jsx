
import React, { useState } from "react";

function CrudForm() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const API = "https://dummyjson.com/products";

  // POST: Add a new product
  const handlePost = async (e) => {
    e.preventDefault();

    if (!title.trim() || price === "" || Number(price) <= 0) {
      alert("Enter a product name and a valid price");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          price: Number(price),
        }),
      });

      const data = await response.json();
      setResult(data);
      alert("Product added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  // PUT: Update an existing product
  const handlePut = async () => {
    if (!id || !title.trim() || price === "" || Number(price) <= 0) {
      alert("Enter product ID, name, and a valid price");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          price: Number(price),
        }),
      });

      const data = await response.json();
      setResult(data);
      alert("Product updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  // DELETE: Remove a product
  const handleDelete = async () => {
    if (!id) {
      alert("Enter the product ID to delete");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      setResult(data);
      alert("Delete request completed!");
    } catch (error) {
      console.error(error);
      alert("Error deleting product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Product CRUD Form</h2>

      <form onSubmit={handlePost}>
        <div className="mb-3">
          <label className="form-label">Product ID (for PUT / DELETE)</label>
          <input
            type="number"
            className="form-control"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter product ID"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter product name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            min="0.01"
            step="0.01"
          />
        </div>

        <div className="d-flex gap-2 flex-wrap">
          <button
            type="submit"
            className="btn btn-success"
            disabled={loading}
          >
            POST
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handlePut}
            disabled={loading}
          >
            PUT
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={loading}
          >
            DELETE
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setId("");
              setTitle("");
              setPrice("");
              setResult(null);
            }}
            disabled={loading}
          >
            Clear
          </button>
        </div>
      </form>

      {loading && <p className="mt-3">Processing...</p>}

      {result && (
        <div className="mt-4">
          <h4>API Response</h4>
          <pre className="bg-light p-3 rounded">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default CrudForm;