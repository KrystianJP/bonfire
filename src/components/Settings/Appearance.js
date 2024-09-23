function Appearance() {
  return (
    <div className="appearance-page settings-content">
      <h1>Appearance</h1>
      <div className="setting-container">
        <div className="setting-label">THEME</div>
        <div className="theme" id="dark-theme"></div>
        <div className="theme" id="light-theme"></div>
      </div>
      <div className="setting-toggle">
        <label className="label" for="role-colours-toggle">
          Remove role colours
        </label>
        <label class="switch">
          <input type="checkbox" id="role-colours-toggle" />
          <span class="slider round"></span>
        </label>
      </div>
      <div className="setting-container">
        <div className="setting-label">TEXT SIZE</div>
        <select
          id="text-size-select"
          className="setting-text-size"
          defaultValue={"16px"}
        >
          <option value="14px">Small</option>
          <option value="16px">Default</option>
          <option value="18px">Large</option>
          <option value="20px">X-Large</option>
        </select>
      </div>
    </div>
  );
}

export default Appearance;
