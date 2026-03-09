import { FileText, Download, Filter, Calendar } from 'lucide-react';

const Reports = () => {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">System Reports</h1>
          <p className="text-slate-400">Generate and export historical traffic and violation analytics.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl transition-colors font-medium border border-slate-700/50">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-xl transition-colors font-medium shadow-lg shadow-primary-500/20">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 flex-1">
        <div className="glass-card flex p-10 items-center justify-center flex-col text-center border-dashed border-2 border-slate-700/50 bg-dark-900/30">
          <div className="bg-slate-800 p-4 rounded-full mb-4 inline-flex items-center justify-center">
            <Calendar className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Reports Generated Yet</h3>
          <p className="text-slate-400 max-w-md mx-auto mb-6">
            Select a date range and metrics above to generate your first traffic analysis or violation report.
          </p>
          <button className="bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 px-6 py-2.5 rounded-xl font-medium transition-colors border border-primary-500/20">
            Create Custom Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
