import { Link } from "react-router-dom";
import { useState } from "react";

function LoginPage({ login }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [registerErrors, setRegisterErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if (login) {
      // Log in
      logIn();
    } else {
      // Register
      register();
    }
  }

  function logIn() {
    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.accessToken) {
          setPassword("");
          setUsername("");
          setLoginError(true);
          // error stuff
          return;
        }
        localStorage.setItem("token", data.accessToken);
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function register() {
    fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.accessToken) {
          setPassword("");
          setUsername("");
          // error stuff
          if (data.errors) {
            setRegisterErrors(data.errors);
          }
          return;
        }
        localStorage.setItem("token", data.accessToken);
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <form action="POST" onSubmit={handleSubmit} className="login-container">
      <h1>{login ? "Log In" : "Register"}</h1>
      <div className="input-container">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          className="search-bar"
          onChange={(e) => {
            setUsername(e.target.value);
            setLoginError(false);
          }}
          value={username}
          required
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="search-bar"
          onChange={(e) => {
            setPassword(e.target.value);
            setLoginError(false);
          }}
          value={password}
          required
        />
      </div>
      <button type="submit">{login ? "Log In" : "Register"}</button>
      <p>
        {login ? "Don't have an account? " : "Already have an account? "}
        <Link className="login-link" to={login ? "/register" : "/login"}>
          {login ? "Register" : "Log In"}
        </Link>
      </p>
      {loginError && (
        <p className="login-error">Incorrect username or password</p>
      )}
      {registerErrors.map((error) => (
        <p className="login-error" key={error}>
          {error}
        </p>
      ))}
    </form>
  );
}

export default LoginPage;
