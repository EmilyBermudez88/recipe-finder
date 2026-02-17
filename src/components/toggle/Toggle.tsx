import React from 'react';
import './Toggle.scss';

interface ToggleProps {
  isMetric: boolean;
  setIsMetric: (value: boolean) => void;
}

const Toggle = ({ isMetric, setIsMetric }: ToggleProps) => {
  const toggleText = isMetric ? 'Metric' : 'Imperial';
  return (
    <div className="toggle-label-container">
      <label className="toggle">
        <span id="toggle-text" className="toggle__text">{toggleText}</span>
        <input className="toggle__input"
               type="checkbox"
               role="switch"
               checked={isMetric}
               onChange={() => setIsMetric(!isMetric)}
               aria-labelledby="toggle-text"/>
        <span className="toggle__container">
          <span className="toggle__slider"/>
        </span>
      </label>
    </div>
  )
};

export default Toggle;