import { Home, Map as MapIcon, Siren, Video, FileText, Settings, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const role = user?.role || 'Staff'; // Default to staff if missing
  const navigate = useNavigate();

  const handleLogout = () => {
      logout();
      navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Live Map', icon: MapIcon, path: '/map' },
    { name: 'Signals', icon: Siren, path: '/signals' },
    { name: 'Violations', icon: Video, path: '/violations' },
    ...(role === 'Admin' ? [
      { name: 'Reports', icon: FileText, path: '/reports' },
      { name: 'Settings', icon: Settings, path: '/settings' }
    ] : [])
  ];

  return (
    <aside className="w-64 h-screen border-r border-slate-700/50 bg-dark-900/95 backdrop-blur-xl flex flex-col fixed left-0 top-0 z-50">
      <div className="h-16 flex items-center px-6 border-b border-slate-700/50 mb-6">
        <div className="flex items-center gap-2 text-primary-500">
          <Siren className="w-6 h-6" />
          <span className="text-xl font-bold tracking-tight text-white">SmartTraffic</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-primary-500/10 text-primary-500 border border-primary-500/20 shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`
            }
          >
            <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700/50 mt-auto">
        <div className="glass-card p-4 flex flex-col gap-2 items-center text-center relative group">
          <button 
             onClick={handleLogout}
             className="absolute top-2 right-2 p-1.5 bg-slate-800 rounded-lg text-slate-400 hover:text-accent-red hover:bg-accent-red/10 transition-colors"
             title="Logout"
          >
             <LogOut className="w-4 h-4" />
          </button>

          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center mt-2">
            <span className="text-sm font-bold text-white">{user?.name ? user.name.substring(0,2).toUpperCase() : 'AD'}</span>
          </div>
          <div className="text-sm border-b border-transparent">
            <p className="text-white text-sm font-medium bg-transparent border-none p-0 text-center uppercase tracking-wider">{role}</p>
            <p className="text-xs text-slate-400 mt-1">{user?.department || 'HQ Control Room'}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
