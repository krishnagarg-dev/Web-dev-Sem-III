import { useEffect, useState } from "react";
import "./Language.css";

function Language() {

  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [time, setTime] = useState(new Date());

  useEffect(() => {

    if (text == "java") {
      setResult("Java is a programming language.");
    }
    else if (text == "python") {
      setResult("Python is a programming language.");
    }
    else if (text == "c++") {
      setResult("C++ is a programming language.");
    }
    else if (text == "javascript") {
      setResult("JavaScript is used for web development.");
    }
    else {
      setResult("");
    }

  }, [text]);

  useEffect(() => {

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  function logout() {
    localStorage.removeItem("login");
    window.location.reload();
  }

  return (
    <div className="page">

      <nav>
        <h2>DevSearch</h2>

        <div>
          <a href="#">Home</a>
          <a href="#">Languages</a>
          <a href="#">About</a>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>

      <div className="main">

        <div className="search-box">

          <h1>Search Bar</h1>
          <p>Search Anything</p>

          <input
            type="text"
            placeholder="Ask Anything..."
            onChange={(e) => setText(e.target.value)}
          />

          <div className="result">
            {result && <h3>{result}</h3>}
          </div>

        </div>

        <div className="clock-box">

          <p>Current Time</p>

          <h1>{time.toLocaleTimeString()}</h1>

        </div>

      </div>

    </div>
  );
}

export default Language;