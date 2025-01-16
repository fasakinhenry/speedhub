import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMap = ({ serverInfo }) => {
  if (!serverInfo || !serverInfo.latitude || !serverInfo.longitude) return null;

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg'>
      <h3 className='text-lg font-semibold mb-4'>Server Location</h3>
      <div className='h-[300px] w-full rounded-lg overflow-hidden'>
        <MapContainer
          center={[serverInfo.latitude, serverInfo.longitude]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[serverInfo.latitude, serverInfo.longitude]}>
            <Popup>
              {serverInfo.city}, {serverInfo.country}
              <br />
              {serverInfo.isp}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationMap;
