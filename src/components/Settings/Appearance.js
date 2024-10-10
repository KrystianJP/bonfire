import { useState } from "react";

function Appearance({ info, setAppearance, setState }) {
  // const [theme, setTheme] = useState(info.theme);
  // const [roleColours, setRoleColours] = useState(info.roleColours);

  return (
    <div className="appearance-page settings-content">
      <h1>Appearance</h1>
      <div className="setting-container">
        <div className="setting-label">THEME</div>
        <div
          className={"theme" + (info.theme === "dark" ? " selected" : "")}
          onClick={() => setState(setAppearance, { ...info, theme: "dark" })}
          id="dark-theme"
        ></div>
        <div
          className={"theme" + (info.theme === "light" ? " selected" : "")}
          onClick={() => setState(setAppearance, { ...info, theme: "light" })}
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
            checked={info.roleColours}
            onChange={() =>
              setState(setAppearance, {
                ...info,
                roleColours: !info.roleColours,
              })
            }
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}

export default Appearance;
