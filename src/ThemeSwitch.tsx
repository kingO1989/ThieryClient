import { useEffect, useState } from "react";
import "./ThemeSwitch.css";

const ThemeSwitch = ({ setMode, mode }: any) => {
  function onClickHandler() {
    mode === false ? setMode(true) : setMode(false);
  }
  useEffect(() => {
    console.log(mode);
  }, [mode]);
  return (
    <>
      <label className="toggle">
        <input type="checkbox" onClick={onClickHandler} />
        <span className="slider"></span>
      </label>

      <p>{mode ? "Dark mode" : "Light mode"}</p>
    </>
  );
};
export default ThemeSwitch;
