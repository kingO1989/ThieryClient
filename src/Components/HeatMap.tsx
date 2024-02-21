import { memo } from "react";
import Plot from "react-plotly.js";
import { ColorScale } from "plotly.js";

const HeatMap = memo(function HeatMap({
  mode,
  HeatMapClickHandler,
  data,
  xvalues,
  yvalues,
  selectedCar,
}: any) {
  const HeatMapColorScaleDark: ColorScale = [
    [0, "rgba(0,0,0,0)"],
    [1, "rgba(255,0,0,0.7)"],
  ];

  const HeatMapColorScaleLight: ColorScale = [
    [0, "rgba(0,0,0,0)"],
    [1, "rgba(55,0,0)"],
  ];

  return (
    <Plot
      className="heat-map-dash"
      onClick={(e) => HeatMapClickHandler(e)}
      data={[
        {
          z: data,
          x: xvalues,
          //yvalues,

          y: yvalues /*  [
                          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                          17, 18, 19, 20, 21, 22, 23, 24,
                        ] */,

          //transpose: true,
          //HeatMapColorScaleLight mode ? "rgb(73, 72, 72)" : "white"
          colorscale: mode ? HeatMapColorScaleLight : HeatMapColorScaleDark,

          // branchvalues: "remainder",
          //  stackgaps: "infer zero",
          hoveron: "fills",
          // zsmooth: "fast", //smoothing algorithm
          text: ["dates", "Hours of the Day"],

          hovertemplate: "Hour: %{y} " + "<br>Date: %{x}</br>" + "Db: %{z}",
          type: "heatmap",
        },
      ]}
      useResizeHandler={true}
      layout={{
        title: {
          text: `<b class="light">${selectedCar} - Heat map</b>`,
          font: {
            color: mode ? "white" : "rgb(73, 72, 72) ",
          },
        },
        height: 600,

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
          fixedrange: true,
        },

        yaxis: {
          color: mode ? "white" : "rgb(73, 72, 72) ",
          zeroline: false,
          autorange: true,
          visible: false,
        },
      }}
    />
  );
},
arePropsEqual);

function arePropsEqual(oldProps: any, newProps: any) {
  console.log(oldProps.mode + " " + newProps.mode);
  console.log(oldProps.selectedCar + " " + newProps.selectedCar);
  if (
    oldProps.data !== newProps.data ||
    oldProps.selectedCar !== newProps.selectedCar ||
    oldProps.mode !== newProps.mode
  )
    return false;
  else return true;
}

export default HeatMap;
