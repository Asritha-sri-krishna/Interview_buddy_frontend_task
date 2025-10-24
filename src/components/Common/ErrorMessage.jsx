import React from 'react';
import { IoClose } from 'react-icons/io5';

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div className="error-message animate-slideUp">
      <span>{message}</span>
      <button
        onClick={onClose}
        className="text-red-700 hover:text-red-900 font-bold text-xl"
      >
        <IoClose />
      </button>
    </div>
  );
};

export default ErrorMessage;