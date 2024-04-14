
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CityList from './components/CityList';
import WeatherComponent from './components/WeatherComponent';
import MapView from './components/MapView';


// import WeatherComponent from './components/WeatherComponent';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CityList />} /> {/* Cities table route */}
        <Route path="/weather" element={<WeatherComponent />} />
        <Route path="/map" element={<MapView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
