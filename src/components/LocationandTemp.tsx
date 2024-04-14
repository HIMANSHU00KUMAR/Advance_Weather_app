import React, { useEffect, useState } from 'react';

interface WeatherData {
    main: {
        temp: number;
    };
    name: string;
}

const LocationAndTemp: React.FC = () => {
    const [location, setLocation] = useState<string>('');
    const [temperature, setTemperature] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getLocationAndWeather = async () => {
        try {
            // Get user's current location
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

                // Fetch weather data using latitude and longitude
                const weatherResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
                );
                if (!weatherResponse.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const weatherData: WeatherData = await weatherResponse.json();
                console.log(weatherData)
                setTemperature(weatherData.main.temp);
                setLocation(weatherData.name);
                setIsLoading(false);
            });
        } catch (error) {
            setError((error as Error).message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getLocationAndWeather();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <p className='text-3xl font-semibold'>
                {location}
                &nbsp; <span className='text-yellow-200'> {temperature} </span> °C
                "
            </p>
        </div>
    );
};

export default LocationAndTemp;
