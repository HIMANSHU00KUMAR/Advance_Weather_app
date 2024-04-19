import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IWeatherData } from "../interfaces/weather";


const WeatherForecast:React.FC = () => {
    const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
  

  const [router] = useSearchParams();

  const lon = router.get('lon');
  const lat = router.get('lat');

  const API_KEY=import.meta.env.VITE_WEATHER_API_KEY;
  const WEATHER_FORECAST_URL="https://api.openweathermap.org/data/2.5/forecast?DE,DE&";

  const fetchWeatherForecastData = useCallback(async () => {

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(

        `${WEATHER_FORECAST_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          
      );
      
      console.log(response.url)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: IWeatherData = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [API_KEY, lat, lon]);

  useEffect(() => {
    fetchWeatherForecastData();
  }, [fetchWeatherForecastData ]);

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
    <div>
      
    </div>
  )
}

export default WeatherForecast
