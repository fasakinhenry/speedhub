import React from 'react';

const ServerInfo = ({ serverInfo }) => {
  if (!serverInfo) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Connection Details</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Server Location</span>
          <span className="font-medium">{serverInfo.city}, {serverInfo.country}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">IP Address</span>
          <span className="font-medium">{serverInfo.ip}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Connection Type</span>
          <span className="font-medium">{serverInfo.protocol}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">ISP</span>
          <span className="font-medium">{serverInfo.isp}</span>
        </div>
      </div>
    </div>
  );
};

export default ServerInfo;
