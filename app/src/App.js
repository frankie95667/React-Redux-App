import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConfirmed, setDeaths } from "./actions/covid19Actions";
import MapChart from "./components/MapChart";
import ReactTooltip from "react-sticky-mouse-tooltip";
import styled from "styled-components";

import "./App.css";

function App() {
  const [content, setContent] = useState({
    state: null,
    confirmed: null,
    deaths: null,
    isVisible: false
  });
  const data = useSelector(state => state.covid19Reducer.countries);
  const isFinished = useSelector(state => state.covid19Reducer.isFinished);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setConfirmed());
  }, []);

  useEffect(() => {
    if(data && !isFinished){
      dispatch(setDeaths(data));
    }
  },[data])

  return (
    <div className="App">
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip offsetY={20} offsetX={20} visible={content.isVisible}>
        <Tooltip>
          <h3>{content.state}</h3>
          <p>Confirmed: {content.confirmed}</p>
          <p>Deaths: {content.deaths}</p>
        </Tooltip>
      </ReactTooltip>
    </div>
  );
}

const Tooltip = styled.div`
  background: #000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 3px;
  opacity: 0.6;
`;

export default App;
