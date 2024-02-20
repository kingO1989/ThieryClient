import Plot from "react-plotly.js";

/**
 * @param mode the current theme of the App
 * @param dependentXvalues the x values readings of the current sky train
 * @param dependentTraceData the y values readings of the current sky train
 */

type ScatterProps = {
  mode: any;
  dependentXvalues: any;
  dependentTraceData: any;
};

/**
 * @param mode the current theme of the App
 * @param dependentTraceData the y values readings of the current sky train
 */

type ViolinProps = {
  mode: any;
  dependentTraceData: any;
};

/**
 *
 * @summary Scatter plot component
 * @returns
 */

function Scatter({ mode, dependentXvalues, dependentTraceData }: ScatterProps) {
  return (
    <>
      <Plot
        style={{ width: "100%" }}
        data={[
          {
            type: "scatter",

            mode: "lines+markers",
            marker: {
              color: mode ? "rgb(0,0,155)" : "rgb(155,0,0)",
              line: {
                width: 0.4,
              },
            },

            x: dependentXvalues,

            y: dependentTraceData,
            hovertemplate: "Db: %{y} " + "<br>Time: %{x}</br>",

            // hover: false
          },
        ]}
        useResizeHandler={true}
        layout={{
          autosize: true,
          plot_bgcolor: mode ? "rgb(73, 72, 72)" : "white",
          paper_bgcolor: mode ? "rgb(73, 72, 72)" : "white",
          title: {
            text: `<b>Scatter Plot</b> <br> </br>`,
            font: {
              color: mode ? "white" : "rgb(73, 72, 72) ",
            },
          },
          height: 500,
          xaxis: {
            zeroline: false,
            title: "<b>Date</b>",
            color: mode ? "white" : "rgb(73, 72, 72) ",
            fixedrange: true,
            automargin: true,
          },

          yaxis: {
            zeroline: false,
            title: "<b> Sound Pressure Level Db</b>",
            color: mode ? "white" : "rgb(73, 72, 72) ",
          },
        }}
      />
    </>
  );
}

/**
 *
 * @summary Violin plot component
 * @returns
 */
function Violin({ mode, dependentTraceData }: ViolinProps) {
  return (
    <>
      <Plot
        style={{ width: "50%" }}
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
        useResizeHandler={true}
        layout={{
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
    </>
  );
}

/**
 *
 * @summary Histogram plot component
 * @returns
 */

function Histogram({
  mode,
  dependentXvalues,
  dependentTraceData,
}: ScatterProps) {
  return (
    <>
      <Plot
        style={{ width: "100%" }}
        data={[
          {
            type: "histogram",

            marker: {
              color: mode ? "rgb(0,0,155)" : "rgb(155,0,0)",
              line: {
                color: "rgb(255, 255, 255)",
                width: 1,
              },
            },

            x: dependentXvalues,

            y: dependentTraceData,
            hovertemplate: "Db: %{y} " + "<br>Time: %{x}</br>",

            // hover: false
          },
        ]}
        useResizeHandler={true}
        layout={{
          autosize: true,
          plot_bgcolor: mode ? "rgb(73, 72, 72)" : "white",
          paper_bgcolor: mode ? "rgb(73, 72, 72)" : "white",
          title: {
            text: `<b>Histogram Plot</b> <br> </br>`,
            font: {
              color: mode ? "white" : "rgb(73, 72, 72) ",
            },
          },
          height: 500,
          xaxis: {
            zeroline: false,
            title: "<b>Date</b>",
            color: mode ? "white" : "rgb(73, 72, 72) ",
            fixedrange: true,
            automargin: true,
          },

          yaxis: {
            zeroline: false,
            title: "<b> Sound Pressure Level Db</b>",
            color: mode ? "white" : "rgb(73, 72, 72) ",
          },
        }}
      />
    </>
  );
}

/**
 *
 * @summary Barchart plot component
 * @returns
 */

function Bar({ mode, dependentXvalues, dependentTraceData }: ScatterProps) {
  return (
    <>
      <Plot
        style={{ width: "100%" }}
        data={[
          {
            type: "bar",

            marker: {
              color: mode ? "rgb(0,0,155)" : "rgb(155,0,0)",
              line: {
                color: "rgb(255, 255, 255)",
                width: 0.5,
                outlierwidth: 99,
              },
            },

            x: dependentXvalues,

            y: dependentTraceData,
            hovertemplate: "Db: %{y} " + "<br>Time: %{x}</br>",

            // hover: false
          },
        ]}
        useResizeHandler={true}
        layout={{
          autosize: true,
          plot_bgcolor: mode ? "rgb(73, 72, 72)" : "white",
          paper_bgcolor: mode ? "rgb(73, 72, 72)" : "white",
          title: {
            text: `<b>Bar Chart</b> <br> </br>`,
            font: {
              color: mode ? "white" : "rgb(73, 72, 72) ",
            },
          },
          height: 500,
          xaxis: {
            zeroline: false,
            gridwidth: 5,
            title: "<b>Date</b>",
            color: mode ? "white" : "rgb(73, 72, 72) ",
            fixedrange: true,
            automargin: true,
          },

          yaxis: {
            zeroline: false,
            title: "<b> Sound Pressure Level Db</b>",
            color: mode ? "white" : "rgb(73, 72, 72) ",
          },
        }}
      />
    </>
  );
}
/**
 *
 * @summary a factory component that renders a plot based on user selection
 */
function OtherPlots({
  selectedplot,
  mode,
  dependentXvalues,
  dependentTraceData,
}: any) {
  switch (selectedplot) {
    case "Scatter":
      return (
        <div className="other_plots">
          <Scatter
            mode={mode}
            dependentXvalues={dependentXvalues}
            dependentTraceData={dependentTraceData}
          />
        </div>
      );
    case "Violin":
      return (
        <>
          <Violin mode={mode} dependentTraceData={dependentTraceData} />
        </>
      );

    case "Histogram":
      return (
        <div className="other_plots">
          <Histogram
            mode={mode}
            dependentXvalues={dependentXvalues}
            dependentTraceData={dependentTraceData}
          />
        </div>
      );

    case "Bar":
      return (
        <div className="other_plots">
          <Bar
            mode={mode}
            dependentXvalues={dependentXvalues}
            dependentTraceData={dependentTraceData}
          />
        </div>
      );

    default:
      return (
        <div className="other_plots">
          <Scatter
            mode={mode}
            dependentXvalues={dependentXvalues}
            dependentTraceData={dependentTraceData}
          />
        </div>
      );
  }
}

export default OtherPlots;
