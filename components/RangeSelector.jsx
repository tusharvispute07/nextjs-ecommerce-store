import React, { useState } from 'react';
import styles from '@/styles/RangeSelector.module.css'

const DualRangeSelector = () => {
  const [rangeValues, setRangeValues] = useState({ min: 25, max: 75 });

  const handleRangeChange = (event, type) => {
    const newValue = type === 'min' ? { min: +event.target.value, max: rangeValues.max } : { min: rangeValues.min, max: +event.target.value };
    setRangeValues(newValue);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="minRangeInput">Min Price:</label>
      <input
        type="range"
        id="minRangeInput"
        min="0"
        max="100"
        step="1"
        value={rangeValues.min}
        onChange={(e) => handleRangeChange(e, 'min')}
      />

      <label htmlFor="maxRangeInput">Max Price:</label>
      <input
        type="range"
        id="maxRangeInput"
        min="0"
        max="100"
        step="1"
        value={rangeValues.max}
        onChange={(e) => handleRangeChange(e, 'max')}
      />

      <p>Selected Range: {rangeValues.min} - {rangeValues.max}</p>
    </div>
  );
};

export default DualRangeSelector;