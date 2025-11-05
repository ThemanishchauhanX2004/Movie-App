import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

const Modal = ({ active: propActive = false, id, children }) => {
  const [active, setActive] = useState(propActive);

  useEffect(() => {
    setActive(propActive);
  }, [propActive]);

  return (
    <div
      id={id}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/40 overflow-auto transition-opacity duration-500 ${
        active ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {children}
    </div>
  );
};

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
  children: PropTypes.node,
};

export const ModalContent = ({ onClose, children, active }) => {
  const contentRef = useRef(null);

  const closeModal = () => {
    if (onClose) onClose();
  };

  return (
    <div
      ref={contentRef}
      className={`relative bg-gray-900 text-white w-4/5 md:w-1/2 p-8 rounded-lg transform transition-all duration-500
        ${active ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-[250px]"}
      `}
    >
      {children}
      <div
        className="absolute top-2 right-2 text-2xl cursor-pointer hover:text-red-500"
        onClick={closeModal}
      >
        <i className="bx bx-x"></i>
      </div>
    </div>
  );
};

ModalContent.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
  active: PropTypes.bool,
};

export default Modal;
