import React from 'react';

const getQualityColor = (score) => {
  if (score >= 90) return 'bg-green-100 text-green-800';
  if (score >= 70) return 'bg-blue-100 text-blue-800';
  if (score >= 50) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

const NetworkQuality = ({ scores }) => {
  if (!scores) return null;

  const categories = [
    { name: 'Gaming', score: scores.gaming },
    { name: 'Streaming', score: scores.streaming },
    { name: 'Real-time Communication', score: scores.rtc },
  ];

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg'>
      <h3 className='text-lg font-semibold mb-4'>Network Quality Score</h3>
      <div className='space-y-4'>
        {categories.map(({ name, score }) => (
          <div key={name} className='space-y-2'>
            <div className='flex justify-between items-center'>
              <span className='text-gray-600'>{name}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getQualityColor(
                  score
                )}`}
              >
                {score}/100
              </span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className={`h-2 rounded-full ${
                  score >= 90
                    ? 'bg-green-500'
                    : score >= 70
                    ? 'bg-blue-500'
                    : score >= 50
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkQuality;
