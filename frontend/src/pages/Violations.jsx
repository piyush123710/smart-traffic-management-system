import { useState, useEffect } from 'react';
import { Video, Calendar, MapPin, User, Search } from 'lucide-react';
import axios from 'axios';
import { io } from 'socket.io-client';

const API_URL = 'http://localhost:5002/api/violations';
const SOCKET_URL = 'http://localhost:5002';

const Violations = () => {
  const [violations, setViolations] = useState([]);

  useEffect(() => {
     axios.get(API_URL).then(res => {
         if(res.data.success) setViolations(res.data.violations);
     }).catch(e => console.error(e));

     const socket = io(SOCKET_URL);
     socket.on('newViolation', (v) => {
         setViolations(prev => [v, ...prev]);
     });

     return () => socket.disconnect();
  }, []);
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Traffic Violations</h1>
        <p className="text-slate-400">Review AI-detected violations and issue challans</p>
      </div>

      <div className="glass-card mb-6">
        <div className="p-4 border-b border-slate-700/50 flex flex-wrap gap-4 items-center justify-between">
           <div className="flex items-center gap-2 text-slate-400 bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-700/50 w-full max-w-sm">
             <Search className="w-4 h-4" />
             <input type="text" placeholder="Search vehicle number..." className="bg-transparent border-none outline-none text-sm w-full text-white" />
           </div>
           <div className="flex gap-2">
             <select className="bg-slate-800 text-slate-300 border border-slate-700/50 rounded-lg px-3 py-2 text-sm outline-none">
               <option>All Types</option>
               <option>Red Light</option>
               <option>Speeding</option>
             </select>
             <button className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
               Export Report
             </button>
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-800/50 text-slate-300 border-b border-slate-700/50 text-xs uppercase font-semibold">
              <tr>
                 <th className="px-6 py-4">ID</th>
                 <th className="px-6 py-4">Violation Type</th>
                 <th className="px-6 py-4">Vehicle</th>
                 <th className="px-6 py-4">Location & Time</th>
                 <th className="px-6 py-4">Fine</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {violations.map((v) => (
                <tr key={v.violationId} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{v.violationId}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-accent-red" />
                      {v.type}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-primary-400">{v.vehicleNumber}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-500"/> {v.location}</span>
                      <span className="flex items-center gap-1 text-xs"><Calendar className="w-3 h-3 text-slate-500"/> {v.timestamp ? new Date(v.timestamp).toLocaleString() : ''}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">${v.fineAmount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      v.status === 'Pending Review' ? 'bg-accent-yellow/10 text-accent-yellow' : 'bg-accent-green/10 text-accent-green'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-primary-500 hover:text-primary-400 font-medium text-sm transition-colors">
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Violations;
