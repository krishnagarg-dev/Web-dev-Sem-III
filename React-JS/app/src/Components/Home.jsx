
import React, { useEffect, useState } from "react";
import Products from "./Products";

const Home = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  useEffect(() => {
    alert("Count = " + count);
  }, [count]);

  return (
    <div className="container">
      <div
        className="text-center py-4"
        style={{ minHeight: "30vh" }}
      >
        <h2>Count = {count}</h2>

        <button
          className="btn btn-primary"
          onClick={() => setCount((prevCount) => prevCount + 1)}
        >
          Inc
        </button>
      </div>

      <hr />

      <Products />
    </div>
  );
};

export default Home;