import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Signals from './pages/Signals';
import Violations from './pages/Violations';
import Settings from './pages/Settings';
import Reports from './pages/Reports';

import LiveMap from './pages/LiveMap';
import CitizenPortal from './pages/CitizenPortal';
import Login from './pages/Login';

import PrivateRoute from './components/PrivateRoute';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/citizen';

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 flex">
      {isAuthPage ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/citizen" element={<CitizenPortal />} />
        </Routes>
      ) : (
        <>
          <Sidebar />
          <div className="flex-1 flex flex-col pl-64 w-full relative z-0">
            <Navbar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto w-full bg-dark-900 h-[calc(100vh-64px)]">
              <Routes>
                <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/map" element={<PrivateRoute><LiveMap /></PrivateRoute>} />
                <Route path="/signals" element={<PrivateRoute><Signals /></PrivateRoute>} />
                <Route path="/violations" element={<PrivateRoute><Violations /></PrivateRoute>} />
                <Route path="/reports" element={<PrivateRoute requiredRole="Admin"><Reports /></PrivateRoute>} />
                <Route path="/settings" element={<PrivateRoute requiredRole="Admin"><Settings /></PrivateRoute>} />
                {/* Fallback for other routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
