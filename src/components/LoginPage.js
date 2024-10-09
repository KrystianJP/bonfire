import { Link } from "react-router-dom";

function LoginPage({ login }) {
  return (
    <div className="login-container">
      <h1>{login ? "Log In" : "Register"}</h1>
      <div className="input-container">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          className="search-bar"
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="search-bar"
        />
      </div>
      <button>Login</button>
      <p>
        {login ? "Don't have an account? " : "Already have an account? "}
        <Link className="login-link" to={login ? "/register" : "/login"}>
          {login ? "Register" : "Log In"}
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
