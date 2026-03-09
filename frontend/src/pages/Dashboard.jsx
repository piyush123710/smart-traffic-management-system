import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Car, AlertTriangle, Siren, Activity } from 'lucide-react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend
);

const SOCKET_URL = 'http://localhost:5002';
const API_URL = 'http://localhost:5002/api/simulation';
const ANALYTICS_API = 'http://localhost:5002/api/analytics/overview';

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeSignals: 0,
    totalViolations: 0,
    activeAlerts: 0,
    avgSpeed: 45 // Static for now until weather/speed API
  });
  
  const [alerts, setAlerts] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    // 1. Fetch initial DB counts
    axios.get(`${API_URL}/stats`).then(res => {
        if (res.data.success) {
            setStats(prev => ({
                ...prev, 
                activeSignals: res.data.data.activeSignals,
                totalViolations: res.data.data.totalViolations,
                activeAlerts: res.data.data.activeAlerts
            }));
        }
    }).catch(e => console.error(e));

    // 2. Fetch analytical overview for charts
    axios.get(ANALYTICS_API).then(res => {
        if(res.data.success) {
            setAnalytics(res.data.data);
        }
    }).catch(err => console.error(err));

    // 3. Connect WebSockets for Real-time AI Stream
    const socket = io(SOCKET_URL);
    
    socket.on('connect', () => {
      console.log('Connected to traffic server');
    });

    socket.on('newAlert', (alertData) => {
        setAlerts(prev => [alertData, ...prev]);
        setStats(prev => ({ ...prev, activeAlerts: prev.activeAlerts + 1 }));
    });

    socket.on('newViolation', (violationData) => {
        setStats(prev => ({ ...prev, totalViolations: prev.totalViolations + 1 }));
        setAnalytics(prev => prev ? {...prev, totalViolations: prev.totalViolations + 1 } : null);
    });
    
    socket.on('densityUpdate', (signalData) => {
        // Just as an effect, we could flash active signals
    });

    return () => socket.disconnect();
  }, []);

  const statCards = [
    { title: 'Active Signals', value: stats.activeSignals, icon: Siren, color: 'text-primary-500', bg: 'bg-primary-500/10' },
    { title: 'Total Violations', value: stats.totalViolations, icon: Car, color: 'text-accent-green', bg: 'bg-accent-green/10' },
    { title: 'Avg Speed (km/h)', value: stats.avgSpeed, icon: Activity, color: 'text-accent-yellow', bg: 'bg-accent-yellow/10' },
    { title: 'Active AI Alerts', value: stats.activeAlerts, icon: AlertTriangle, color: 'text-accent-red', bg: 'bg-accent-red/10' },
  ];

  // --- Chart Configurations ---
  const lineChartData = {
    labels: analytics?.violationTrends?.labels || [],
    datasets: [
      {
        label: 'Violations This Week',
        data: analytics?.violationTrends?.data || [],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'top', labels: { color: '#94a3b8' } } },
      scales: {
          x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
          y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
      }
  };

  const barChartData = {
      labels: ['Low', 'Medium', 'High', 'Severe'],
      datasets: [
          {
              label: 'Traffic Density Nodes',
              data: [
                  analytics?.densityStats?.Low || 0,
                  analytics?.densityStats?.Medium || 0,
                  analytics?.densityStats?.High || 0,
                  analytics?.densityStats?.Severe || 0,
              ],
              backgroundColor: ['#22c55e', '#eab308', '#f97316', '#ef4444'],
          }
      ]
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top', labels: { color: '#94a3b8' } } },
    scales: {
        x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
    }
  };

  const doughnutData = {
      labels: analytics?.violationTypes?.labels || [],
      datasets: [{
          data: analytics?.violationTypes?.data || [],
          backgroundColor: ['#3b82f6', '#8b5cf6', '#eab308', '#ef4444', '#10b981'],
          borderWidth: 0,
      }]
  };
  
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'right', labels: { color: '#94a3b8' } } }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">System Overview</h1>
        <p className="text-slate-400">Real-time city traffic conditions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, idx) => (
          <div key={idx} className="glass-card p-6 flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium mb-1">{stat.title}</p>
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6 h-[400px]">
              <h2 className="text-lg font-semibold text-white mb-4">Violations Over Time</h2>
              <div className="w-full h-[300px]">
                {analytics ? <Line data={lineChartData} options={lineChartOptions} /> : <div className="animate-pulse w-full h-full bg-slate-800/50 rounded-xl"></div>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 h-[300px]">
                  <h2 className="text-lg font-semibold text-white mb-4">Traffic Density Scope</h2>
                  <div className="w-full h-[200px]">
                    {analytics ? <Bar data={barChartData} options={barChartOptions} /> : <div className="animate-pulse w-full h-full bg-slate-800/50 rounded-xl"></div>}
                  </div>
                </div>
                <div className="glass-card p-6 h-[300px]">
                  <h2 className="text-lg font-semibold text-white mb-4">Violation Breakdown</h2>
                  <div className="w-full h-[200px] flex justify-center">
                    {analytics ? <Doughnut data={doughnutData} options={doughnutOptions} /> : <div className="animate-pulse w-full h-full bg-slate-800/50 rounded-xl"></div>}
                  </div>
                </div>
            </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-accent-red"/> Live AI Alerts</h2>
          <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
            
            {alerts.length === 0 ? (
                <p className="text-slate-500 text-sm">No critical events detected.</p>
            ) : (
                alerts.map((alert, i) => (
                    <div key={i} className="p-3 rounded-lg bg-accent-red/10 border border-accent-red/20 flex gap-3 items-start animate-pulse mb-3">
                      <AlertTriangle className="w-5 h-5 text-accent-red shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">{alert.type}</p>
                        <p className="text-xs text-slate-400 mt-1">{alert.description}</p>
                        <p className="text-xs text-accent-red/80 mt-2">{new Date(alert.timestamp).toLocaleTimeString()}</p>
                      </div>
                    </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
