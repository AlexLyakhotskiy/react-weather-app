import axios from 'axios';

const API_KEY = '441d58bab7b086fba70a85b8a02758d0';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function fetchData(url) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export const fetchForecastByCoords = (lat, lon) => {
  return fetchData(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  );
};

export const fetchForecastByCityName = cityName => {
  return fetchData(
    `${BASE_URL}/find?q=${cityName}&appid=${API_KEY}&units=metric`,
  );
};
