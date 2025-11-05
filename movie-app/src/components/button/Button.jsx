import React from "react";
import PropTypes from "prop-types";

const Button = ({ className = "", onClick, children }) => {
  return (
    <button
      onClick={onClick ? () => onClick() : null}
      className={`cursor-pointer font-sans border-4 border-transparent bg-red-600 text-white 
        rounded-xl px-7 py-2 text-xl font-semibold shadow-[0_0_7px_8px_rgba(255,0,0,0.3)] 
        transition-shadow duration-300 relative hover:shadow-[0_0_7px_15px_rgba(255,0,0,0.3)]
        ${className}`}
    >
      {children}
    </button>
  );
};

export const OutlineButton = ({ className = "", onClick, children }) => {
  return (
    <button
      onClick={onClick ? () => onClick() : null}
      className={`cursor-pointer font-sans border-2 border-white bg-transparent text-white 
        rounded-xl px-7 py-2 text-xl font-semibold 
        transition-colors duration-300 ease-in-out
        hover:text-red-600 hover:bg-white
        ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Button;
