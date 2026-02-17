const API_KEY = '0e353b69178bef3dcaa9a2349e7ef65a';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
  icon: string;
}

export async function getWeather(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();

  return {
    temp: Math.round(data.main.temp),
    condition: data.weather[0].main,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
    location: data.name,
    icon: data.weather[0].icon,
  };
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();

  return {
    temp: Math.round(data.main.temp),
    condition: data.weather[0].main,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6),
    location: data.name,
    icon: data.weather[0].icon,
  };
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  pop: number; // Probability of precipitation (0-1)
  dt_txt: string;
}

export interface ForecastData {
  list: ForecastItem[];
  city: {
    name: string;
    country: string;
  };
}

export async function getForecast(
  lat: number,
  lon: number
): Promise<ForecastData> {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }

  const data = await response.json();
  return data;
}
