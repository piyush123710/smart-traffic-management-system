import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { io } from 'socket.io-client';

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const SOCKET_URL = 'http://localhost:5002';

// Hardcoded coordinates for our Simulated mockup
const cityCenter = [40.7128, -74.0060]; // Map center (e.g. NYC mockup)

const LOCATIONS_GEO = {
    "Downtown Main Intersection": [40.7128, -74.0060],
    "Highway Exit 42": [40.7200, -74.0100],
    "City Center Mall": [40.7050, -73.9950],
    "Hospital Road Junction": [40.7180, -73.9900]
};

const LiveMap = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socket.on('newAlert', (alertData) => {
        if(LOCATIONS_GEO[alertData.location]) {
           setAlerts(prev => [...prev, { ...alertData, geo: LOCATIONS_GEO[alertData.location] }]);
        }
    });
    return () => socket.disconnect();
  }, []);

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Live Real-time Map</h1>
        <p className="text-slate-400">GIS view of city traffic nodes, active signals, and AI alerts.</p>
      </div>

      <div className="flex-1 rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl relative z-0">
        <MapContainer center={cityCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          
          {/* Static rendering of our mock Signals */}
          {Object.entries(LOCATIONS_GEO).map(([name, coords]) => (
            <Marker key={name} position={coords}>
              <Popup className="bg-dark-800 text-slate-100 border-none rounded-lg custom-popup">
                <div className="font-semibold">{name}</div>
                <div className="text-xs text-slate-400">Active Node</div>
              </Popup>
            </Marker>
          ))}

          {/* Dynamic AI Alerts */}
          {alerts.map((alert, idx) => (
             <Circle 
                key={idx} 
                center={alert.geo} 
                radius={400} 
                pathOptions={{ color: 'red', fillColor: '#ef4444', fillOpacity: 0.4 }} 
             >
                <Popup>
                   <p className="font-bold text-red-500">{alert.type}</p>
                   <p>{alert.description}</p>
                </Popup>
             </Circle>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default LiveMap;
