import { useState } from "react";

function Appearance({ info }) {
  const [theme, setTheme] = useState(info.theme);
  const [roleColours, setRoleColours] = useState(info.roleColours);

  return (
    <div className="appearance-page settings-content">
      <h1>Appearance</h1>
      <div className="setting-container">
        <div className="setting-label">THEME</div>
        <div
          className={"theme" + (theme === "dark" ? " selected" : "")}
          onClick={() => setTheme("dark")}
          id="dark-theme"
        ></div>
        <div
          className={"theme" + (theme === "light" ? " selected" : "")}
          onClick={() => setTheme("light")}
          id="light-theme"
        ></div>
      </div>
      <div className="setting-toggle">
        <label className="label" htmlFor="role-colours-toggle">
          Remove role colours
        </label>
        <label className="switch">
          <input
            type="checkbox"
            id="role-colours-toggle"
            checked={roleColours}
            onChange={() => setRoleColours(!roleColours)}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}

export default Appearance;
