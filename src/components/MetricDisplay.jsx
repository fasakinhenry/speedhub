import React from 'react';

const MetricsDisplay = ({ metrics }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
      <div className='bg-white p-6 rounded-lg shadow-lg'>
        <h3 className='text-sm font-medium text-gray-500'>Download Speed</h3>
        <p className='text-3xl font-bold text-gray-900'>
          {metrics.download} <span className='text-lg'>Mbps</span>
        </p>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-lg'>
        <h3 className='text-sm font-medium text-gray-500'>Upload Speed</h3>
        <p className='text-3xl font-bold text-gray-900'>
          {metrics.upload} <span className='text-lg'>Mbps</span>
        </p>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-lg'>
        <h3 className='text-sm font-medium text-gray-500'>Latency</h3>
        <p className='text-3xl font-bold text-gray-900'>
          {metrics.latency} <span className='text-lg'>ms</span>
        </p>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-lg'>
        <h3 className='text-sm font-medium text-gray-500'>Jitter</h3>
        <p className='text-3xl font-bold text-gray-900'>
          {metrics.jitter} <span className='text-lg'>ms</span>
        </p>
      </div>
    </div>
  );
};

export default MetricsDisplay;
