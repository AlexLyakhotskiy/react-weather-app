import React from 'react';

import styles from './ListItem.module.scss';

export default function ListItem({ data }) {
  const {
    name,
    clouds: { all },
    coord: { lat, lon },
    main: { temp, temp_min, temp_max, pressure },
    sys: { country },
    weather,
    wind: { speed },
  } = data;
  const { description, icon } = weather[0];

  return (
    <li className={styles.item}>
      <div className={styles.imgWrapper}>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="weather-icon"
          className=""
        />
      </div>
      <div className={styles.textWrapper}>
        <p className={styles.title}>
          {name}, {country} {description}
        </p>
        <p className={styles.weatherText}>
          {temp} temperature from {temp_min} to {temp_max} C, wind {speed} m/s.
          clouds {all} %, {pressure} hpa
        </p>
        <p className={styles.coords}>
          Geo coords [{lat}, {lon}]
        </p>
      </div>
    </li>
  );
}
