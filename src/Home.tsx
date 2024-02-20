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

  /**
   *
   * @param e the user click event captured on the heat map
   */
  async function HeatMapClickHandler(e: any) {
    console.log("Heat map click recalcullated");

    let results: Response = await fetch(
      `${host}/filterbydate?selecteddate=${e.points[0].x}`
    ); //filterbydate

    let json: any = await results.json();
    setDependentTraceData(json.dbs);
    setDependentXvalues(json.dates);

    setDateRange(
      "From " +
        new Date(json.dateRange.min) +
        " <br><b>To</b></br>  " +
        new Date(json.dateRange.max)
    );
  }

  /**
   *
   * @param e the event representing the change of values from the select element
   * @summary filters the sky train data by car selected
   * @returns
   */

  async function onChangeCarModel(e: any) {
    if (e.target.value === "all") {
      fetchData();
      return;
    }
    console.log("car model recalculed");
    let car_name_model = e.target.value.split("-");
    let carName = car_name_model[0];
    let car_model;
    if (car_name_model[1] === undefined) car_model = "car models";
    else car_model = car_name_model[1];
    let carString = carName + " - " + car_model;
    setSelectedCar(() => carString);

    let results: Response = await fetch(
      `${host}/filterbyCar?car=${car_name_model[0]}`
    ); //filterbydate

    let json: any = await results.json();

    setError(false);
    setData(json.dbs);

    setXValues(json.dates);
    setYValues(json.hours);

    setDependentTraceData(json.dbs);
    setDependentXvalues(json.dates);
    setDateRange("Unfiltered");
  }

  /**
   *
   * @param event captures the tab option selected by the user
   * @summary handler to display the other available plots
   */
  function tabBtnClickHandler(event: React.MouseEvent<HTMLButtonElement>) {
    setTabDisplay(event.currentTarget.value);
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
      <div className="select_and_theme">
        <div className="select_sky_train">
          <label htmlFor="skytrains">Select Train</label>
          <select
            className="skytrains"
            data-tag
            onChange={(e) => onChangeCarModel(e)}
          >
            <option>all</option>
            {cars
              ? cars.map((c: any, id) => {
                  return (
                    <option
                      value={`${c.car_number}-${c.car_model}`}
                      key={id}
                      data-tag={`${c.car_number} - ${c.car_model}`}
                    >
                      {" "}
                      {c.car_number} - {c.car_model}{" "}
                    </option>
                  );
                })
              : ""}
          </select>
        </div>
      </div>
      {data ? (
        <>
          <HeatMap
            mode={mode}
            HeatMapClickHandler={HeatMapClickHandler}
            data={data}
            xvalues={xvalues}
            yvalues={yvalues}
            selectedCar={selectedCar}
          />

          <br></br>
          <div className="tab_nav">
            <button value={"Scatter"} onClick={tabBtnClickHandler}>
              Scatter Plot
            </button>

            <button value={"Violin"} onClick={tabBtnClickHandler}>
              Violin Plot
            </button>
          </div>
          <div className="other_plots">
            <OtherPlots
              selectedplot={tabdisplay}
              mode={mode}
              dependentXvalues={dependentXvalues}
              dependentTraceData={dependentTraceData}
            />
          </div>
        </>
      ) : (
        ""
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
