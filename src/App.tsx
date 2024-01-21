import { useEffect, useRef, useState } from "react";
import Plot from "react-plotly.js";
import "./App.css";

function App() {
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState();
  const [dependentTraceData, setDependentTraceData] = useState();
  const [xvalues, setXValues] = useState();
  const [yvalues, setYValues] = useState();
  const [dependentXvalues, setDependentXvalues] = useState();
  const [dependentYvalues, setDependentYvalues] = useState();
  const [dateRange, setDateRange] = useState("Unfiltered");

  const host = "https://thiery-server.vercel.app";
  async function fetchData() {
    let result;

    try {
      result = await fetch(`${host}/`);
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
    console.log(json);
    setDateRange(
      "From " +
        new Date(json.dateRange.min) +
        " <br><b>To</b></br>  " +
        new Date(json.dateRange.max)
    );
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {error ? (
        <p>Error</p>
      ) : (
        <div>
          <div>
            {data ? (
              <>
                <Plot
                  onClick={(e) => HeatMapClickHandler(e)}
                  data={[
                    {
                      z: data,
                      x: xvalues,
                      y: yvalues,
                      colorscale: [
                        [0, "rgba(0,0,255,0)"],
                        [1, "rgba(255,0,0,0.7)"],
                      ],

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
                    title: "Heat map",
                    xaxis: {
                      zeroline: false,
                      title: "<b>Date</b>",
                    },

                    yaxis: {
                      zeroline: false,
                      title: "<b>Hour of the day</b>",
                    },
                  }}
                />

                <br></br>
                <Plot
                  data={[
                    {
                      type: "scatter",

                      mode: "lines+markers",
                      marker: { color: "red" },
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
                    title: `Scatter Plot <br> <b>Range:</b>${dateRange}</br>`,
                    xaxis: {
                      zeroline: false,
                      title: "<b>Date</b>",
                    },

                    yaxis: {
                      zeroline: false,
                      title: "<b> Sound Pressure Level Db</b>",
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
                    title: `Violin Plot <br> <b>Range:</b>${dateRange}</br>`,

                    yaxis: {
                      zeroline: false,
                      title: "<b> Sound Pressure Level Db</b>",
                    },
                  }}
                />
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
