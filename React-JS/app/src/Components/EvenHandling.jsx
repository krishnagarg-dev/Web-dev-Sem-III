import React from "react";

const App = () => {
    function clickMe(){
        alert("Welcome to React Event Handling");
    }
  return (
    <div>
      <button onClick={()=>{alert("Welcome to React by Inline arrow fn Handling");}}>
        Click Me
      </button>
    </div>
  );
};

export default App;
