import React, { useEffect, useState } from 'react';
import useGeolocation from 'react-hook-geolocation';

import Searchbar from '../Searchbar/Searchbar';
import SliderInput from '../SliderInput/SliderInput';
import ListItem from '../ListItem/ListItem';

import {
  fetchForecastByCityName,
  fetchForecastByCoords,
} from '../../utils/apiServices';
import { getColorFromTemp } from '../../utils/functions';

import styles from './App.module.scss';

export default function App() {
  const [temparature, setTemparature] = useState(0);
  const [weatherIcon, setWeatherIcon] = useState('');
  const [query, setQuery] = useState('');
  const [countryData, setCountryData] = useState([]);

  const { latitude, longitude } = useGeolocation();

  useEffect(() => {
    if (!latitude) {
      return;
    }
    (async () => {
      try {
        const { main, weather } = await fetchForecastByCoords(
          latitude,
          longitude,
        );
        setTemparature(Math.floor(main.temp));
        setWeatherIcon(weather[0].icon);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [latitude, longitude]);

  useEffect(() => {
    if (!query.trim()) {
      setCountryData([]);
      return;
    }
    (async () => {
      try {
        const { list } = await fetchForecastByCityName(query);
        setCountryData(list);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [query]);

  return (
    <main
      className={`${styles.main} ${!countryData.length && styles.mainCenter}`}
      style={{
        backgroundColor: getColorFromTemp(temparature),
      }}
    >
      <div>
        <Searchbar onSubmit={setQuery} />
        {latitude && !countryData.length && (
          <div className={styles.imageWrapper}>
            <img
              src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
              alt="weather-icon"
              className=""
            />
          </div>
        )}
        {!countryData.length && (
          <SliderInput value={temparature} onChange={setTemparature} />
        )}
        {!!countryData.length && (
          <ul className={styles.list}>
            {countryData.map(data => (
              <ListItem data={data} key={data.id} />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
