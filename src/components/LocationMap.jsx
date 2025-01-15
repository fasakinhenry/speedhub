import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LocationMap = ({ serverInfo }) => {
  const position = [serverInfo.latitude, serverInfo.longitude];

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg'>
      <h3 className='text-lg font-semibold mb-4'>Server Location</h3>
      <div className='h-[400px]'>
        <MapContainer center={position} zoom={13} className='h-full'>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>Server Location: {serverInfo.location}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationMap;
