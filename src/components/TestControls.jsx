import React from 'react';

const TestControls = ({ status, onStart, onPause }) => {
  return (
    <div className="flex justify-center space-x-4">
      {status === 'running' ? (
        <button
          onClick={onPause}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Pause Test
        </button>
      ) : (
        <button
          onClick={onStart}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Start Test
        </button>
      )}
    </div>
  );
};

export default TestControls;
