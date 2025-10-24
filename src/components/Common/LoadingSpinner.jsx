import React, { memo } from 'react';

const LoadingSpinner = memo(({ text = 'Loading...' }) => {
  return (
    <div className="flex flex-col justify-center items-center py-8 sm:py-12 min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-gray-300 border-t-blue-600"></div>
      <p className="text-gray-600 mt-3 sm:mt-4 font-medium text-sm sm:text-base">{text}</p>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;