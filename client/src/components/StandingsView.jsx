import { useState } from 'react'

export default function StandingsView({ standings, onClose }) {
  const [activeTab, setActiveTab] = useState('drivers')

  return (
    <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto pb-10 md:pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-900 pb-4 md:pb-6 gap-4">
        <div>
          <h2 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter leading-none">Simulated Standings</h2>
          <div className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1 md:mt-2">World Championship Season 2025</div>
        </div>
        <button 
          onClick={onClose}
          className="bg-slate-800 hover:bg-slate-700 text-white px-3 md:px-4 py-2 rounded text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all self-start sm:self-auto"
        >
          Back to Editor
        </button>
      </header>

      <div className="flex gap-2 md:gap-4 border-b border-slate-900 pb-px">
        <button 
          onClick={() => setActiveTab('drivers')}
          className={`pb-3 md:pb-4 px-1 md:px-2 text-xs md:text-sm font-black uppercase italic tracking-widest transition-all border-b-2 ${activeTab === 'drivers' ? 'border-red-600 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
        >
          Drivers
        </button>
        <button 
          onClick={() => setActiveTab('constructors')}
          className={`pb-3 md:pb-4 px-1 md:px-2 text-xs md:text-sm font-black uppercase italic tracking-widest transition-all border-b-2 ${activeTab === 'constructors' ? 'border-red-600 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
        >
          Constructors
        </button>
      </div>

      <div className="bg-slate-900/20 rounded-xl md:rounded-2xl border border-slate-900 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/50 border-b border-slate-900">
              <th className="p-3 md:p-4 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 w-12 md:w-16 text-center">Pos</th>
              {activeTab === 'drivers' ? (
                <>
                  <th className="p-3 md:p-4 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Driver</th>
                  <th className="p-3 md:p-4 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 hidden sm:table-cell">Team</th>
                </>
              ) : (
                <th className="p-3 md:p-4 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Team</th>
              )}
              <th className="p-3 md:p-4 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900">
            {activeTab === 'drivers' ? (
              standings.drivers.map((driver) => (
                <tr key={driver.driverNo} className="hover:bg-slate-900/30 transition-colors">
                  <td className="p-3 md:p-4 font-black italic text-slate-400 text-center text-xs md:text-base">{driver.position}</td>
                  <td className="p-3 md:p-4">
                    <div className="font-black uppercase italic tracking-tight text-white text-xs md:text-base truncate">{driver.driverName}</div>
                    <div className="text-[8px] font-bold text-slate-600 uppercase tracking-widest sm:hidden truncate">{driver.team}</div>
                  </td>
                  <td className="p-3 md:p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:table-cell truncate">{driver.team}</td>
                  <td className="p-3 md:p-4 text-right font-black italic text-red-600 text-xs md:text-base">{driver.totalPoints}</td>
                </tr>
              ))
            ) : (
              standings.constructors.map((team) => (
                <tr key={team.team} className="hover:bg-slate-900/30 transition-colors">
                  <td className="p-3 md:p-4 font-black italic text-slate-400 text-center text-xs md:text-base">{team.position}</td>
                  <td className="p-3 md:p-4 font-black uppercase italic tracking-tight text-white text-xs md:text-base truncate">{team.team}</td>
                  <td className="p-3 md:p-4 text-right font-black italic text-red-600 text-xs md:text-base">{team.totalPoints}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
