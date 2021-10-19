import React from 'react';

import styles from './SliderInput.module.scss';

export default function SliderInput({ value, onChange }) {
  return (
    <input
      className={styles.input}
      type="range"
      name="temparature"
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      min="-20"
      max="40"
      step="1"
    />
  );
}
