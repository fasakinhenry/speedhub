import React, { useState } from 'react';

const NetworkSpeed = () => {
  const [speed, setSpeed] = useState(null);
  const [loading, setLoading] = useState(false);

  const testNetworkSpeed = async () => {
    setLoading(true);
    const imageUrl = 'https://via.placeholder.com/1000';
    const startTime = Date.now();
    try {
      await fetch(imageUrl);
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000; // seconds
      const fileSizeInBits = 1000 * 1000 * 8; // 1MB in bits
      const speedInMbps = (fileSizeInBits / duration / (1024 * 1024)).toFixed(
        2
      );
      setSpeed(speedInMbps);
    } catch (error) {
      console.error('Error testing network speed:', error);
      setSpeed('Error');
    }
    setLoading(false);
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h1 className='text-4xl font-bold mb-4'>Network Speed Test</h1>
      <button
        onClick={testNetworkSpeed}
        className='bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition'
      >
        {loading ? 'Testing...' : 'Test Speed'}
      </button>
      {speed && (
        <p className='mt-4 text-lg'>
          {speed === 'Error' ? 'Failed to test speed.' : `Speed: ${speed} Mbps`}
        </p>
      )}
    </div>
  );
};

export default NetworkSpeed;
