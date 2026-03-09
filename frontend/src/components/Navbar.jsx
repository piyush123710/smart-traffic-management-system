import { Bell, Search, User } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="h-16 border-b border-slate-700/50 bg-dark-900/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-10 w-full pl-72">
      <div className="flex items-center gap-2 text-slate-400 bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-700/50 w-64 focus-within:ring-2 focus-within:ring-primary-500/50 transition-all">
        <Search className="w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search locations, signals..." 
          className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-500 text-white"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-red rounded-full ring-2 ring-dark-900"></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
