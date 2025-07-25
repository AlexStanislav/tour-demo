import "./RangeSlider.css";
import { useState } from "react";
import type { RangeSliderProps } from "../../utils/types";

function RangeSlider({ min, max, inputAction }: RangeSliderProps) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  function handleMinChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.target.value);
    if (value < maxValue) {
      setMinValue(value);
      inputAction(value, maxValue);
    }
  }

  function handleMaxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.target.value);
    if (value > minValue) {
      setMaxValue(value);
      inputAction(minValue, value);
    }
  }

  const range = max - min;

  const normalizedMinValue = (minValue - min) / range;
  const normalizedMaxValue = (maxValue - min) / range;

  const trackPosition = Math.floor(normalizedMinValue * 100);
  const trackWidth = Math.floor(
    (normalizedMaxValue - normalizedMinValue) * 100
  );

  return (
    <div className="range">
      <div className="range__inputs">
        <div className="range__track">
          <div
            className="track__value"
            style={{
              left: `${trackPosition}%`,
              width: `${trackWidth}%`,
            }}
          ></div>
        </div>
        <input
          type="range"
          className="range__input range__min"
          step={100}
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
        />
        <input
          type="range"
          className="range__input range__max"
          step={10}
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
        />
      </div>
      <div className="range__values">
        <span className="range__value">{minValue}</span>
        <span className="range__value">{maxValue}</span>
      </div>
    </div>
  );
}

export default RangeSlider;
