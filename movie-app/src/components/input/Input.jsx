import React from "react";

const Input = ({ type = "text", placeholder = "", value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange ? (e) => onChange(e) : null}
      className="
        border-0 
        bg-black 
        text-white 
        text-base 
        rounded-lg 
        px-6 
        py-2 
        font-sans 
        focus:outline-none
      "
    />
  );
};

export default Input;
