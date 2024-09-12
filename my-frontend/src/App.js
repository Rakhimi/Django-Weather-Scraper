import Weather from "./Weather";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StateWeather from "./StateWeather";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Weather className = 'wrapper'/>}/>
        <Route path="/state/:stateName" element={<StateWeather/>}/>
      </Routes>
    </Router>
  );
}

export default App;
