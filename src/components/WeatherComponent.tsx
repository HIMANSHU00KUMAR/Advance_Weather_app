import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IWeatherData } from '../interfaces/weather';
import WeatherCard from './WeatherCard';


const WeatherComponent: React.FC = () => {
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [router] = useSearchParams();

  const lon = router.get('lon');
  const lat = router.get('lat');

  const API_KEY=import.meta.env.VITE_WEATHER_API_KEY;
  const WEATHER_BASE_URL=import.meta.env.VITE_WEATHER_BASE_URL;



  const fetchWeatherData = useCallback(async () => {

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(

        `${WEATHER_BASE_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          
      );
      
      console.log("weartherurl = "+response.url)

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      

      const data: IWeatherData= await response.json();
      
      
      setWeatherData(data);
      
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [API_KEY, WEATHER_BASE_URL, lat, lon]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  if (isLoading) {
    return <div>Loading weather data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!weatherData) {
    return <div>No weather data found.</div>;
  }


  return (
    <div className='h-screen flex justify-center items-center'>
      <WeatherCard
        weatherData={weatherData}
      />
    </div>
  );
};

export default WeatherComponent;
