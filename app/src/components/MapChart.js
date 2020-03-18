import React, { useEffect, isValidElement, memo } from "react";
import { useSelector } from "react-redux";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const colorScale = scaleQuantize()
  .domain([0, 5000])
  .range([
    "#D6D6DA",
    "#D98880",
    "#CD6155",
    "#C0392B",
    "#A93226",
    "#922B21",
    "#7B241C",
    "#641E16",
    '#561C15'
  ]);

function MapChart({ setTooltipContent }) {
  const data = useSelector(state => state.covid19Reducer.countries);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (data) {
    return (
      <ComposableMap data-tip="" projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              let cur = null;
              for (const prop in data) {
                if (geo.id === data[prop].id) {
                  cur = data[prop];
                }
              }
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(cur ? cur.Cases : "#EEE")}
                  onMouseEnter={() => {
                    const { NAME } = geo.properties;
                    setTooltipContent({
                      content: `${cur.Province}: ${cur.Cases}`,
                      isVisible: true
                    });
                  }}
                  onMouseLeave={() => {
                    setTooltipContent({
                      content: "",
                      isVisible: false
                    });
                  }}
                  style={{
                    hover: {
                      opacity: 0.5,
                      outline: "none"
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    );
  } else {
    return <div></div>;
  }
}

export default memo(MapChart);
