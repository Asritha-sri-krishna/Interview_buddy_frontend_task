import React, { memo } from 'react';
import { IoClose } from 'react-icons/io5';

const SuccessMessage = memo(({ message, onClose }) => {
  return (
    <div className="success-message animate-slideUp">
      <span className="text-sm sm:text-base">{message}</span>
      <button
        onClick={onClose}
        className="text-green-700 hover:text-green-900 font-bold text-lg sm:text-xl ml-2"
      >
        <IoClose />
      </button>
    </div>
  );
});

SuccessMessage.displayName = 'SuccessMessage';

export default SuccessMessage;