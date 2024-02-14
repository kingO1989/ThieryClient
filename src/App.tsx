import { useEffect, useRef, useState } from "react";
import Plot from "react-plotly.js";
import "./App.css";
import supabase from "./SBClient";
import HeadBodyGrid from "./HeatBodyGrid";
import ThemeSwitch from "./ThemeSwitch";
import { ColorScale } from "plotly.js";

function App() {
  console.log("App Rendered");
  // const [theme, setTheme] = useState<boolean>(false);
  const [mode, setMode] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState();
  const [dependentTraceData, setDependentTraceData] = useState();
  const [xvalues, setXValues] = useState();
  const [yvalues, setYValues] = useState();
  const [dependentXvalues, setDependentXvalues] = useState();
  const [dependentYvalues, setDependentYvalues] = useState();
  const [dateRange, setDateRange] = useState("Unfiltered");
  const [cars, setCars] = useState<Array<string>>();
  const [selectedCar, setSelectedCar] = useState<string>("All Sky Trains");

  const modeState = useRef();

  const HeatMapColorScaleDark: ColorScale = [
    [0, "rgba(0,0,255,0)"],
    [1, "rgba(255,0,0,0.7)"],
  ];

  const HeatMapColorScaleLight: ColorScale = [
    [0, "rgba(0,0,0,0)"],
    [1, "rgba(55,0,0)"],
  ];

  const host = "https://thiery-server.vercel.app";
  async function fetchData() {
    let result;

    try {
      result = await fetch(`${host}/`);

      const { data, error } = await supabase.from("cars").select();
      if (error) console.log(error);
      if (data) {
        setCars(data);
      }

      /*      
      setData(() => data);
      violindata = [
        {
          type: "violin",
          y: result,
          points: "none",
          box: {
            visible: true,
          },
          boxpoints: false,
          line: {
            color: "black",
          },
          fillcolor: "#8dd3c7",
          opacity: 0.6,
          meanline: {
            visible: true,
          },
          x0: "Total Bill",
        },
      ];

      layout = {
        title: "",
        yaxis: {
          zeroline: false,
        },
      }; */
    } catch (err) {
      setError(true);

      return;
    }
    let json = await result.json();

    /*
    x: date itself,
    y: //Hours of the day,
    type: 'heatmap',
    hoverongaps: false
    */

    setError(false);
    setData(json.dbs);

    setXValues(json.dates);
    setYValues(json.hours);

    setDependentTraceData(json.dbs);
    setDependentXvalues(json.dates);
  }

  async function HeatMapClickHandler(e: any) {
    console.log(e.points[0].x);

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

  async function onChangeCarModel(e: any) {
    let car_name_model = e.target.value.split("-");
    let carName = car_name_model[0];
    let car_model;
    if (car_name_model[1] === undefined) car_model = "car models";
    else car_model = car_name_model[1];
    setSelectedCar(carName + " - " + car_model);
    console.log(car_name_model);
    let results: Response = await fetch(
      `${host}/filterbyCar?car=${car_name_model[0]}`
    ); //filterbydate

    let json: any = await results.json();

    setError(false);
    setData(json.dbs);
    console.log(json.dbs);

    setXValues(json.dates);
    setYValues(json.hours);

    setDependentTraceData(json.dbs);
    setDependentXvalues(json.dates);
    setDateRange("Unfiltered");

    console.log(json);
  }

  useEffect(() => {
    fetchData();
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
            <ThemeSwitch setMode={setMode} mode={mode} />
            <h4>Filter by sky train</h4>
            <select data-tag onChange={(e) => onChangeCarModel(e)}>
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
            {data ? (
              <>
                <Plot
                  className="heat-map-dash"
                  onClick={(e) => HeatMapClickHandler(e)}
                  data={[
                    {
                      z: data,
                      x: xvalues,
                      y: yvalues,
                      //HeatMapColorScaleLight mode ? "rgb(73, 72, 72)" : "white"
                      colorscale: mode
                        ? HeatMapColorScaleLight
                        : HeatMapColorScaleDark,
                      /*         colorscale: 
                       [
                        [0, "rgba(0,0,255,0)"],
                        [1, "rgba(255,0,0,0.7)"],
                      ], */
                      branchvalues: "remainder",
                      stackgaps: "infer zero",
                      hoveron: "fills",
                      // zsmooth: "fast", //smoothing algorithm
                      text: ["dates", "Hours of the Day"],
                      //texttemplate: "Price: %{y:dddd}",
                      //hoverinfo: "x",
                      hovertemplate:
                        "Hour: %{y} " + "<br>Date: %{x}</br>" + "Db: %{z}",
                      type: "heatmap",
                    },
                  ]}
                  layout={{
                    width: 1300,
                    height: 500,

                    title: {
                      text: `<b class="light">${selectedCar} - Heat map</b>`,
                      font: {
                        color: mode ? "white" : "rgb(73, 72, 72) ",
                      },
                    },

                    plot_bgcolor: mode ? "rgb(73, 72, 72)" : "white",
                    paper_bgcolor: mode ? "rgb(73, 72, 72)" : "white",

                    xaxis: {
                      type: "date",
                      // dtick: "date",
                      zeroline: false,
                      color: mode ? "white" : "rgb(73, 72, 72) ",
                      title: {
                        text: `<b>Date</b>`,
                        font: {
                          color: mode ? "white" : "rgb(73, 72, 72) ",
                        },
                      },
                      autorange: true,
                    },

                    yaxis: {
                      color: mode ? "white" : "rgb(73, 72, 72) ",
                      zeroline: false,
                      autorange: true,
                    },
                  }}
                />

                <br></br>
                <div className="other_plots">
                  <Plot
                    data={[
                      {
                        type: "scatter",

                        mode: "lines+markers",
                        marker: {
                          color: mode
                            ? "rgba(0,0,155,0.3)"
                            : "rgba(155,0,0,0.3)",
                        },
                        x: dependentXvalues,
                        xgap: 5,
                        y: dependentTraceData,
                        hovertemplate: "Db: %{y} " + "<br>Time: %{x}</br>",

                        // hover: false
                      },
                    ]}
                    layout={{
                      width: 1000,
                      height: 500,
                      plot_bgcolor: mode ? "rgb(73, 72, 72)" : "white",
                      paper_bgcolor: mode ? "rgb(73, 72, 72)" : "white",

                      title: {
                        text: `<b>Scatter Plot</b> <br> </br>`,
                        font: {
                          color: mode ? "white" : "rgb(73, 72, 72) ",
                        },
                      },
                      xaxis: {
                        zeroline: false,
                        title: "<b>Date</b>",
                        color: mode ? "white" : "rgb(73, 72, 72) ",
                      },

                      yaxis: {
                        zeroline: false,
                        title: "<b> Sound Pressure Level Db</b>",
                        color: mode ? "white" : "rgb(73, 72, 72) ",
                      },
                    }}
                  />

                  <Plot
                    data={[
                      {
                        type: "violin",
                        y: dependentTraceData,
                        points: false,
                        box: {
                          visible: true,
                        },
                        boxpoints: false,
                        line: {
                          color: "black",
                        },
                        fillcolor: "#8dd3c7",
                        opacity: 0.6,
                        meanline: {
                          visible: true,
                        },
                        x0: "  ",
                      },
                    ]}
                    layout={{
                      width: 800,
                      height: 500,
                      plot_bgcolor: mode ? "rgb(73, 72, 72)" : "white",
                      paper_bgcolor: mode ? "rgb(73, 72, 72)" : "white",
                      title: {
                        text: `<b>Violin Plot</b> <br></br>`,
                        font: {
                          color: mode ? "white" : "rgb(73, 72, 72) ",
                        },
                      },
                      yaxis: {
                        zeroline: false,
                        title: "<b> Sound Pressure Level Db</b>",
                        color: mode ? "white" : "rgb(73, 72, 72) ",
                      },
                    }}
                  />
                </div>
              </>
            ) : (
              ""
            )}
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
