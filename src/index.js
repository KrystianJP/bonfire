import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const originalConsoleLog = console.log;
// Override console.log
console.log = (...args) => {
  // Check if the log message contains "Agora-SDK" or any other identifying keyword
  if (
    args.some((arg) => typeof arg === "string" && arg.includes("Agora-SDK"))
  ) {
    // Suppress the log
    return;
  }

  // Call the original console.log for all other messages
  originalConsoleLog(...args);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
