
export interface IWeatherData {

  cod:number;
  message:string;
  cnt:number;
  
  list:{

    coord: {
      lon: number;
      lat: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    visibility: number;
    wind: { speed: number; deg: number,gust:number };
    clouds: { all: number };
    dt: number;
    sys: { type: number; id: number; country: string; sunrise: number; sunset: number };
    timezone: number;
    id: number;
    name: string;
    cod: number;


  },[]

  city:{
    id: number,
    name:string,
    coord: {
      lat: number,
      lon: number
    },
  }
    country: number,
    population: number,
    timezone: number,
    sunrise: number,
    sunset: number
}
  