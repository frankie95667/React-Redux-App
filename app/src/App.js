import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSummary } from "./actions/covid19Actions";
import MapChart from "./components/MapChart";
import ReactTooltip from "react-sticky-mouse-tooltip";
import styled from "styled-components";

import "./App.css";

function App() {
  const [content, setContent] = useState({
    state: null,
    confirmed: null,
    isVisible: false
  });
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSummary());
  }, []);

  return (
    <div className="App">
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip offsetY={20} offsetX={20} visible={content.isVisible}>
        <Tooltip>
          <h3>{content.state}</h3>
          <p>Confirmed: {content.confirmed}</p>
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
