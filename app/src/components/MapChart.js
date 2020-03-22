import React, { useEffect, isValidElement, memo, useState } from "react";
import { useSelector } from "react-redux";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from "styled-components";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

function MapChart({setTooltipContent}) {
  const data = useSelector(state => state.covid19Reducer.countries);
  // const [tooltipContent, setTooltipContent] = useState({
  //   content: '',
  //   isVisible: false
  // });
  const [max, setMax] = useState();

  useEffect(() => {
    if(data){
      let largestValue;
      for(const state in data){
        if(!largestValue || largestValue < data[state].Cases){
          largestValue = data[state].Cases;
        }
      }
      setMax(largestValue);
    }
  }, [data]);

  const colorScale = (value) => {
    const color = scaleLinear()
    .domain([0, max ? max : 5000])
    .range([
      "#D98880",
      // "#CD6155",
      // "#C0392B",
      // "#A93226",
      // "#922B21",
      // "#7B241C",
      // "#641E16",
      "#561C15"
    ]);
   return(color(value))
  }

  if (data) {
    return (
      <>
        <h1>Total Confirmed Cases of COVID-19 in the US</h1>
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
                  <>
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={
                      cur && cur.Cases
                        ? colorScale(cur ? cur.Cases : 0)
                        : "#eee"
                    }
                    onMouseEnter={(e) => {
                      const { NAME } = geo.properties;
                      setTooltipContent({
                        state: cur && cur.Province ? cur.Province : 'Georgia',
                        confirmed: cur && cur.Cases ? cur.Cases : 0,
                        isVisible: true,
                      });
                    }}
                    onMouseLeave={(e) => {
                      setTooltipContent({
                        state: null,
                        confirmed: null,
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
                  </>
                );
              })
            }
          </Geographies>
        </ComposableMap>
        <ScaleAndColorWrapper>
          <TitleWrapper>
            <h3>Scale</h3>
          </TitleWrapper>
          <div>
            <ScaleWrapper>
              <p>0</p>
          <p>{max}+</p>
            </ScaleWrapper>
            <FlexWrapper>
              <ColorSquare color={colorScale(0)} />
              <ColorSquare color={colorScale(max*(1/5))} />
              <ColorSquare color={colorScale(max*(2/5))} />
              <ColorSquare color={colorScale(max*(3/5))} />
              <ColorSquare color={colorScale(max*(4/5))} />
              <ColorSquare color={colorScale(max)} />
            </FlexWrapper>
          </div>
        </ScaleAndColorWrapper>
      </>
    );
  } else {
    return (
      <>
        <CircularProgress style={{width: '5%', height: 'auto', position: 'absolute', top: '40%'}} />
        <h1>Total Confirmed Cases of COVID-19 in the US</h1>
        
        <ComposableMap data-tip="" projection="geoAlbersUsa">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={"#eee"}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
        <ScaleAndColorWrapper>
          <TitleWrapper>
            <h3>Scale</h3>
          </TitleWrapper>
          <div>
            <ScaleWrapper>
              <p>0</p>
          <p>5000+</p>
            </ScaleWrapper>
            <FlexWrapper>
              <ColorSquare color={colorScale(0)} />
              <ColorSquare color={colorScale(100)} />
              <ColorSquare color={colorScale(500)} />
              <ColorSquare color={colorScale(1000)} />
              <ColorSquare color={colorScale(2000)} />
              <ColorSquare color={colorScale(5000)} />
            </FlexWrapper>
          </div>
        </ScaleAndColorWrapper>
      </>
    );
  }
}

const FlexWrapper = styled.div`
  display: flex;
`;

const LoadingWrapper = styled(FlexWrapper)`
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    heigth: 100vh;
`;

const ScaleAndColorWrapper = styled(FlexWrapper)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ScaleWrapper = styled(FlexWrapper)`
  width: 300px;
  justify-content: space-between;
`;

const ColorSquare = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${props => props.color};
`;

const TitleWrapper = styled.div`
  width: 300px;
  text-align: left;
`;

export default memo(MapChart);
