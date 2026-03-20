import { useState } from 'react'

export default function StandingsView({ standings, onClose }) {
  const [activeTab, setActiveTab] = useState('drivers')

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center justify-between border-b border-slate-900 pb-6">
        <div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">Simulated Standings</h2>
          <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">World Championship Season 2025</div>
        </div>
        <button 
          onClick={onClose}
          className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all"
        >
          Back to Editor
        </button>
      </header>

      <div className="flex gap-4 border-b border-slate-900 pb-px">
        <button 
          onClick={() => setActiveTab('drivers')}
          className={`pb-4 px-2 text-sm font-black uppercase italic tracking-widest transition-all border-b-2 ${activeTab === 'drivers' ? 'border-red-600 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
        >
          Driver Standings
        </button>
        <button 
          onClick={() => setActiveTab('constructors')}
          className={`pb-4 px-2 text-sm font-black uppercase italic tracking-widest transition-all border-b-2 ${activeTab === 'constructors' ? 'border-red-600 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
        >
          Constructor Standings
        </button>
      </div>

      <div className="bg-slate-900/20 rounded-2xl border border-slate-900 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/50 border-b border-slate-900">
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-500 w-16 text-center">Pos</th>
              {activeTab === 'drivers' ? (
                <>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Driver</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-500 hidden md:table-cell">Team</th>
                </>
              ) : (
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Team</th>
              )}
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900">
            {activeTab === 'drivers' ? (
              standings.drivers.map((driver) => (
                <tr key={driver.driverNo} className="hover:bg-slate-900/30 transition-colors">
                  <td className="p-4 font-black italic text-slate-400 text-center">{driver.position}</td>
                  <td className="p-4">
                    <div className="font-black uppercase italic tracking-tight text-white">{driver.driverName}</div>
                    <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest md:hidden">{driver.team}</div>
                  </td>
                  <td className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden md:table-cell">{driver.team}</td>
                  <td className="p-4 text-right font-black italic text-red-600">{driver.totalPoints}</td>
                </tr>
              ))
            ) : (
              standings.constructors.map((team) => (
                <tr key={team.team} className="hover:bg-slate-900/30 transition-colors">
                  <td className="p-4 font-black italic text-slate-400 text-center">{team.position}</td>
                  <td className="p-4 font-black uppercase italic tracking-tight text-white">{team.team}</td>
                  <td className="p-4 text-right font-black italic text-red-600">{team.totalPoints}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
