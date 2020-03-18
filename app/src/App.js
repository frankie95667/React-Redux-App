import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSummary } from './actions/covid19Actions';
import MapChart from './components/MapChart';
import MapScale from './components/MapScale';
import ReactTooltip from 'react-sticky-mouse-tooltip';

import './App.css';

function App() {
  const [content, setContent] = useState({
    content: '',
    isVisible: false
  });
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSummary());
  }, [])

  
  return (
    <div className="App">
      <MapChart setTooltipContent={setContent}/>
    </div>
  );
}

export default App;
