import React from "react";

const FormInput = ({ type, label, placeholder, value, onChange }) => {
  return (
    <label className="w-full">
      <span className="text-xl text-neutral-400 block">{label}*</span>
      {type === "textarea" ? (
        <textarea
          className="w-full p-4 rounded-lg bg-neutral-700 text-neutral-300 outline-none placeholder-neutral-500 resize-none"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          rows="5"
          spellCheck="false"
        />
      ) : (
        <input
          className="w-full p-4 rounded-lg bg-neutral-700 text-neutral-300 outline-none placeholder-neutral-500"
          placeholder={placeholder}
          onChange={onChange}
          type={type}
          value={value}
          step={0.1}
          min={0.1}
          spellCheck="false"
        />
      )}
    </label>
  );
};

export default FormInput;
