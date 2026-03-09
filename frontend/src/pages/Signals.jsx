import { useState, useEffect } from 'react';
import { Siren, Clock, Activity, CheckCircle, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { io } from 'socket.io-client';

const API_URL = 'http://localhost:5002/api/signals';
const SOCKET_URL = 'http://localhost:5002';

const Signals = () => {
  const [signals, setSignals] = useState([]);
  
  useEffect(() => {
     axios.get(API_URL).then(res => {
         if(res.data.success) setSignals(res.data.signals);
     }).catch(e => console.error(e));

     const socket = io(SOCKET_URL);
     
     socket.on('densityUpdate', (updatedSignal) => {
         setSignals(prev => prev.map(sig => 
             sig.signalId === updatedSignal.signalId ? updatedSignal : sig
         ));
     });

     socket.on('smartCorridorActivated', ({ route }) => {
         setSignals(prev => prev.map(sig => 
             route.includes(sig.signalId) ? { ...sig, status: 'GREEN' } : sig
         ));
     });

     return () => socket.disconnect();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Traffic Signals</h1>
          <p className="text-slate-400">Monitor and override automated traffic lights</p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-primary-500/20">
          Emergency Override All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {signals.map((signal) => (
          <div key={signal.signalId} className="glass-card p-5 relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-1 h-full ${
              signal.status === 'GREEN' ? 'bg-accent-green' : 
              signal.status === 'RED' ? 'bg-accent-red' : 'bg-accent-yellow'
            }`}></div>
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-bold text-slate-500">{signal.signalId}</p>
                <h3 className="text-white font-medium mt-1 leading-tight">{signal.location}</h3>
              </div>
              <Siren className={`w-5 h-5 ${
                signal.status === 'GREEN' ? 'text-accent-green' : 
                signal.status === 'RED' ? 'text-accent-red' : 'text-accent-yellow'
              }`} />
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 flex items-center gap-1"><Activity className="w-4 h-4" /> Density</span>
                <span className={`font-medium ${
                  signal.trafficDensity === 'High' || signal.trafficDensity === 'Severe' ? 'text-accent-red' : 
                  signal.trafficDensity === 'Medium' ? 'text-accent-yellow' : 'text-accent-green'
                }`}>{signal.trafficDensity || 'Low'}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 flex items-center gap-1"><Clock className="w-4 h-4" /> Updated</span>
                <span className="text-slate-300">
                   {signal.lastUpdated ? new Date(signal.lastUpdated).toLocaleTimeString() : 'Just now'}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
               <button className="flex-1 text-xs py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-medium transition-colors border border-slate-700/50">
                View Feed
               </button>
               <button className="flex-1 text-xs py-2 bg-primary-500/10 hover:bg-primary-500/20 text-primary-400 rounded font-medium transition-colors border border-primary-500/20">
                Override
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Signals;
