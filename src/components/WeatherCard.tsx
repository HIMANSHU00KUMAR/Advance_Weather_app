import { IWeatherData } from "../interfaces/weather";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faDroplet, faWind } from '@fortawesome/free-solid-svg-icons'

interface WeatherCardProps {
    weatherData: IWeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
    const mapUrl = `https://maps.google.com/maps?q=${weatherData.coord.lat},${weatherData.coord.lon}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;


    const getGradientClass = () => {
        switch (weatherData.weather[0].main) {
            case 'Clear':
                return 'bg-gradient-to-r from-yellow-200 to-orange-200';
            case 'Clouds':
                return 'bg-gradient-to-r from-gray-200 to-gray-400';
            case 'Rain':
                return 'bg-gradient-to-r from-blue-200 to-blue-500';
            default:
                return 'bg-gray-100';
        }
    };

    return (
        <div className={`${getGradientClass()} capitalize p-4 rounded-md shadow-md flex flex-col md:flex-row justify-between md:w-3/4 lg:w-full overflow-hidden`}>
            <div className="flex flex-col justify-between">
                <div>     
                <h2 className="text-3xl font-bold text-black"><FontAwesomeIcon icon={faLocationDot} size='lg' /> {weatherData.name}</h2>
                    <div className="flex items-center mt-2">
                        <img className="w-28 mr-2" src={iconUrl} alt="Weather Icon" />
                        <div className="text-4xl font-semibold">{weatherData.main.temp}°C</div>
                    </div>
                    <div className="text-2xl font-semibold mt-1">{weatherData.weather[0].description}</div>
                </div>
                <div className="mt-4 flex flex-col ">
                    <div className="flex items-center ">
                        <span className="font-semibold mr-2"><FontAwesomeIcon icon={faDroplet} /> Humidity:</span>
                        <span>{weatherData.main.humidity}%</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold mr-2">Feels like:</span>
                        <span>{weatherData.main.feels_like}°C</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold mr-2"><FontAwesomeIcon icon={faWind} /> Wind Speed:</span>
                        <span>{weatherData.wind.speed} m/s</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold mr-2">Wind Deg:</span>
                        <span>{weatherData.wind.deg}°</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold mr-2">Wind Gust:</span>
                        <span>{weatherData.wind.gust}°</span>
                    </div>
                </div>
            </div>
            <div className="md:w-1/2 h-60 md:h-auto ">
                <iframe title="map" className="w-full h-full rounded-md  shadow-md" src={mapUrl} />
            </div>
        </div>
    );
};

export default WeatherCard;
