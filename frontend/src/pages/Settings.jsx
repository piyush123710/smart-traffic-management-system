import { Settings as SettingsIcon, Shield, Server, Bell, Key, Database, RefreshCw, Smartphone } from 'lucide-react';

const Settings = () => {
  const settingsGroups = [
    {
      title: "System Configuration",
      icon: Server,
      settings: [
        { name: "AI Detection Sensitivity", type: "range", value: "75%" },
        { name: "Camera Refresh Rate", type: "select", value: "500ms" },
        { name: "Max Green Light Duration", type: "number", value: "120s" },
      ]
    },
    {
      title: "Security & Access",
      icon: Shield,
      settings: [
        { name: "Require Two-Factor Auth", type: "toggle", value: true },
        { name: "MFA Token Expiry", type: "select", value: "24 Hours" },
        { name: "API Key Rotation", type: "action", actionLabel: "Rotate Keys" },
      ]
    },
    {
      title: "Smart Citizen Portal",
      icon: Smartphone,
      settings: [
        { name: "Enable Public API", type: "toggle", value: true },
        { name: "Max Allowed Public Clients", type: "number", value: 5000 },
      ]
    }
  ];

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Platform Settings</h1>
        <p className="text-slate-400">Configure global parameters and security rules. (Restricted to Administrators)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        <div className="lg:col-span-2 space-y-6">
          
          {settingsGroups.map((group, idx) => (
             <div key={idx} className="glass-card p-6">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-4">
                  <div className="bg-primary-500/20 p-2 rounded-lg">
                    <group.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">{group.title}</h2>
                </div>

                <div className="space-y-6">
                  {group.settings.map((setting, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-slate-300 font-medium">{setting.name}</span>
                      
                      {setting.type === 'toggle' && (
                         <div className={`w-12 h-6 rounded-full cursor-not-allowed transition-colors ${setting.value ? 'bg-primary-500' : 'bg-slate-700'} relative`}>
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${setting.value ? 'left-7' : 'left-1'}`}></div>
                         </div>
                      )}

                      {setting.type === 'range' && (
                         <div className="flex items-center gap-3">
                           <input type="range" className="w-32 accent-primary-500 cursor-not-allowed" disabled defaultValue="75" />
                           <span className="text-xs font-mono text-slate-400 w-8">{setting.value}</span>
                         </div>
                      )}

                      {setting.type === 'select' && (
                        <select className="bg-slate-800 text-slate-300 text-sm rounded-lg px-3 py-1.5 border border-slate-700 cursor-not-allowed" disabled>
                          <option>{setting.value}</option>
                        </select>
                      )}

                      {setting.type === 'number' && (
                        <div className="bg-slate-800 text-slate-300 text-sm rounded-lg px-3 py-1.5 border border-slate-700 min-w-[80px] text-center">
                          {setting.value}
                        </div>
                      )}

                      {setting.type === 'action' && (
                        <button className="bg-slate-700 hover:bg-slate-600 transition-colors text-white px-4 py-1.5 rounded-lg text-sm font-medium">
                          {setting.actionLabel}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
             </div>
          ))}

        </div>

        <div className="space-y-6">
           {/* Actions box */}
           <div className="glass-card p-6">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2"><RefreshCw className="w-5 h-5 text-accent-yellow" /> System Actions</h3>
              <div className="space-y-3">
                 <button className="w-full text-left px-4 py-3 bg-slate-800/80 hover:bg-slate-800 rounded-xl text-slate-300 text-sm font-medium transition-colors">Restart AI Engine Container</button>
                 <button className="w-full text-left px-4 py-3 bg-slate-800/80 hover:bg-slate-800 rounded-xl text-slate-300 text-sm font-medium transition-colors">Clear ANPR Cache</button>
                 <button className="w-full text-left px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-sm font-medium transition-colors border border-red-500/20">Purge Violations DB (Admin Only)</button>
              </div>
           </div>

           {/* API Key box */}
           <div className="glass-card p-6">
             <h3 className="text-white font-medium mb-2 flex items-center gap-2"><Key className="w-5 h-5 text-primary-400" /> Webhook Integrations</h3>
             <p className="text-xs text-slate-400 mb-4">Master token for 3rd party police dispatch integration.</p>
             <div className="bg-dark-900 border border-slate-700 rounded-lg p-3 flex justify-between items-center group">
               <span className="font-mono text-xs text-slate-500 tracking-wider">st_live_892nf...</span>
               <button className="text-primary-500 text-xs font-bold hover:text-primary-400">COPY</button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
