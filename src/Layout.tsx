import { useEffect, useState } from "react";
import "./App.css";
import supabase from "./SBClient";
import HeadBodyGrid from "./HeatBodyGrid";
import ThemeSwitch from "./ThemeSwitch";
import HeatMap from "./Components/HeatMap";
import OtherPlots from "./Components/OtherPlots";
import Plot from "react-plotly.js";

function App() {
  console.log("App Rendered");

  const [mode, setMode] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState();
  const [dependentTraceData, setDependentTraceData] = useState();
  const [xvalues, setXValues] = useState();
  const [yvalues, setYValues] = useState();
  const [dependentXvalues, setDependentXvalues] = useState();
  const [, setDateRange] = useState("Unfiltered");
  const [cars, setCars] = useState<Array<string>>();
  const [selectedCar, setSelectedCar] = useState<string>();
  const host = "http://127.0.0.1:3000"; //"https://thiery-server.vercel.app";
  const [tabdisplay, setTabDisplay] = useState<string>();
  /**
   *
   * @summary fetches sky train noise data
   */
  async function fetchData() {
    let result;

    try {
      result = await fetch(`${host}/mod`); // remove mod to revert

      const { data, error } = await supabase.from("cars").select();
      if (error) console.log(error);
      if (data) {
        setCars(data);
      }
    } catch (err) {
      setError(true);

      return;
    }
    let json = await result.json();

    setError(false);
    setData(json.dbs);

    setXValues(json.dates);
    setYValues(json.hours);

    setDependentTraceData(json.dbs);
    setDependentXvalues(json.dates);
    setSelectedCar("All Sky Trains");
  }

  //responsiveness

  function resizeListener() {
    let result = window.matchMedia("(max-width: 600px)").matches; //returns booles
    if (result === false) {
      // mobileMenuRef.current.style.display = "none";
      //overlayRef.current.style.display = "none";
    }
  }

  useEffect(() => {
    console.log("useeefect called");
    fetchData();
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener); //Cleanup
  }, []);
  return (
    <>
      {error ? (
        <>
          <h1>Error</h1>
          <p>Contact Admin</p>
        </>
      ) : data ? (
        <div>
          <div className={`container ${mode ? "dark" : "light"}`}>
            <div className="header">
              <nav>
                <span>
                  <b>Sky Train</b>
                </span>
                <span>
                  <b>Project Detail</b>
                </span>
              </nav>
              <ThemeSwitch setMode={setMode} mode={mode} />
            </div>
          </div>
        </div>
      ) : (
        <HeadBodyGrid />
      )}
    </>
  );
}

export default App;

/*
For reference:
range removed::  <b>Range:</b>${dateRange}
Heat map y axis   title: "<b>Hour of the day</b>",

*/
