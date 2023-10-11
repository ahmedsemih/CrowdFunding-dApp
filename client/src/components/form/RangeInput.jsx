import React from "react";

const RangeInput = ({ value, onChange, max, step, min = 0 }) => {
  return (
    <input
      type="range"
      value={value}
      onChange={onChange}
      max={max}
      step={step}
      min={min}
      className="w-full accent-emerald-500 outline-none"
    />
  );
};

export default RangeInput;
