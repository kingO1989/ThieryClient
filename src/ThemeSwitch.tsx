import { useEffect } from "react";
import "./ThemeSwitch.css";

const ThemeSwitch = ({ setMode, mode }: any) => {
  function onClickHandler() {
    mode === false ? setMode(true) : setMode(false);
  }
  useEffect(() => {
    console.log(mode);
  }, [mode]);
  return (
    <div className="theme_switch">
      <label className="toggle">
        <input type="checkbox" onClick={onClickHandler} />
        <span className="slider"></span>
      </label>

      <span>{mode ? "Dark mode" : "Light mode"}</span>
    </div>
  );
};
export default ThemeSwitch;
