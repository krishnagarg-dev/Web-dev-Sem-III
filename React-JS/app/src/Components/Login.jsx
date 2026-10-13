
import { useState } from "react";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function login(e) {
    e.preventDefault();

    const user = username.trim();

    if (user === "admin" && password === "1234") {
      localStorage.setItem("login", "true");
      window.location.reload();
    } else {
      setError("Wrong username or password");
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>DevSearch Login</h1>

        <form onSubmit={login}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;