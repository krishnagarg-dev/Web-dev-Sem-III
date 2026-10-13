import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <section className="w-[75%] max-w-[720px] mx-auto py-[8px]">
      <h1 className="m-0 text-[20px] font-normal">Counter</h1>
      <div className="mt-2 flex items-center gap-2">
        <button
          onClick={() => setCount(count - 1)}
          className="px-3 py-1 bg-blue-600 text-white text-sm"
        >
          -
        </button>
        <span className="text-sm">{count}</span>
        <button
          onClick={() => setCount(count + 1)}
          className="px-3 py-1 bg-blue-600 text-white text-sm"
        >
          +
        </button>
      </div>
    </section>
  );
};

export default Counter;
