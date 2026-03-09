import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Siren, Lock, Mail, ShieldAlert, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('admin@traffic.gov'); // Demo default
  const [password, setPassword] = useState('admin123'); // Demo default
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login, user } = useAuth();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data } = await axios.post('http://localhost:5002/api/users/login', { email, password });
      
      if (data.success) {
        login(data);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to connect to authentication server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative blurred blobs behind the login */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-red/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="glass-card w-full max-w-md p-8 relative z-10 border border-slate-700/50">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mb-4 border border-primary-500/20 shadow-lg shadow-primary-500/10">
            <Siren className="w-8 h-8 text-primary-500" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">SmartTraffic HQ</h1>
          <p className="text-sm text-slate-400 mt-1 mb-2">Authorized Personnel Only</p>
          
          {error && (
            <div className="w-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-xl text-center font-medium animate-pulse mt-4">
              {error}
            </div>
          )}
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl leading-5 bg-dark-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all sm:text-sm"
                placeholder="admin@traffic.gov"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl leading-5 bg-dark-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all sm:text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-slate-700 rounded bg-dark-900" />
              <label className="ml-2 block text-slate-300">Remember me</label>
            </div>
            <a href="#" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all shadow-primary-500/30 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : 'Authenticate'}
          </button>
        </form>
        
        <div className="mt-6 pt-6 border-t border-slate-700/50 flex items-center justify-center gap-2 text-xs text-slate-500">
           <ShieldAlert className="w-4 h-4" /> 256-bit Encrypted Connection
        </div>
      </div>
    </div>
  );
};

export default Login;
