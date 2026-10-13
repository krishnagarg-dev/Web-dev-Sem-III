import React, { useState } from "react";
import Counter from "./Counter";
// import "./CounterP.css"
const CounterP = () => {
  let [counters, setCounters] = useState([
    { id: 1, count: 0 },
    { id: 2, count: 3 },
    { id: 3, count: 2 },   
  ]);

  const increment = (id) => {
   setCounters(counters.map((row)=>(row.id===id?{...row,count:row.count+1}:row)))
  };
  const decrement = (id) => {
    setCounters(counters.map((row)=>(row.id===id?{...row,count:row.count-1}:row)))
  };
  const resetCounter=()=>{
    setCounters(counters.map((row)=>({...row,count:0})))
  }
  return (
    <div className="container vh-100">
      {counters.map((counter) => (
        <Counter
          key={counter.id}
          id={counter.id}
          count={counter.count}
          increment={increment}
          decrement={decrement}
        />
      ))}
      <button className="mt-2 btn btn-danger" onClick={resetCounter}>
        Reset
      </button>
    </div>
  );
};

export default CounterP;
