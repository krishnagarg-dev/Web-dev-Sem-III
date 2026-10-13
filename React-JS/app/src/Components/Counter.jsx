import React, { useState } from "react";

const Counter = (props) => {
  // let [count,setCount]=useState(props.count);
  let {id,count,increment,decrement}=props;
  
  return (
    <div className="mt-3">
      <button className="btn btn-primary" onClick={()=>decrement(id)}>-</button>
      <b className=" bg-warning rounded pt-1 pb-2 px-3 py-3 mx-2 my-2">{count}</b>
      <button className="btn btn-primary" onClick={()=>increment(id)}>+</button>      
    </div>
  );
};

export default Counter;
