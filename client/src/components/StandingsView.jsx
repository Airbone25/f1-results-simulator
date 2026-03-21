import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TEAM_ASSETS, DRIVER_ASSETS } from '../data/assets'

export default function StandingsView({ standings, onClose }) {
  const [activeTab, setActiveTab] = useState('drivers')
  const winner = standings.drivers[0]
  const teamAsset = TEAM_ASSETS[winner.team] || { color: '#ef4444' }
  const driverAsset = DRIVER_ASSETS[winner.driverNo]

  return (
    <div className="space-y-6 md:space-y-12 max-w-5xl mx-auto pb-10 md:pb-20">
      {/* Winner Hero Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-3xl bg-slate-900/40 border border-white/5 p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-2xl"
      >
        <div 
          className="absolute inset-0 opacity-20"
          style={{ background: `radial-gradient(circle at 70% 50%, ${teamAsset.color}, transparent)` }}
        />
        
        <div className="relative z-10 flex-1 text-center md:text-left">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-slate-500 mb-2"
          >
            Simulated Champion
          </motion.div>
          <motion.h2 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-4"
          >
            {winner.driverName}
          </motion.h2>
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center md:justify-start gap-3"
          >
            <div className="w-1 h-6 rounded-full" style={{ backgroundColor: teamAsset.color }}></div>
            <span className="text-lg md:text-2xl font-bold uppercase italic text-slate-400">{winner.team}</span>
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex items-center justify-center md:justify-start gap-4"
          >
            <div className="text-center">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Points</div>
              <div className="text-2xl md:text-4xl font-black italic">{winner.totalPoints}</div>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div className="text-center">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Gap</div>
              <div className="text-2xl md:text-4xl font-black italic text-green-500">P1</div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 15, delay: 0.4 }}
          className="relative z-10 w-48 h-48 md:w-80 md:h-80 flex-shrink-0"
        >
          <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl"></div>
          {driverAsset?.headshot ? (
            <img 
              src={driverAsset.headshot} 
              alt={winner.driverName}
              className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-8xl font-black italic opacity-20">
               {winner.driverNo}
             </div>
          )}
        </motion.div>
      </motion.div>

      <div className="space-y-6">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 md:pb-6 gap-4">
          <div className="flex gap-2 md:gap-6">
            <button 
              onClick={() => setActiveTab('drivers')}
              className={`text-sm md:text-xl font-black uppercase italic tracking-widest transition-all ${activeTab === 'drivers' ? 'text-white' : 'text-slate-600 hover:text-slate-400'}`}
            >
              Driver Standings
            </button>
            <button 
              onClick={() => setActiveTab('constructors')}
              className={`text-sm md:text-xl font-black uppercase italic tracking-widest transition-all ${activeTab === 'constructors' ? 'text-white' : 'text-slate-600 hover:text-slate-400'}`}
            >
              Constructors
            </button>
          </div>
          <button 
            onClick={onClose}
            className="bg-white text-black hover:bg-red-600 hover:text-white px-4 md:px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all self-start sm:self-auto"
          >
            Edit Results
          </button>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 rounded-3xl border border-white/5 overflow-hidden backdrop-blur-sm shadow-2xl"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="p-4 md:p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 w-16 md:w-24 text-center">Pos</th>
                {activeTab === 'drivers' ? (
                  <>
                    <th className="p-4 md:p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Driver / Team</th>
                  </>
                ) : (
                  <th className="p-4 md:p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Team</th>
                )}
                <th className="p-4 md:p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="wait">
                {(activeTab === 'drivers' ? standings.drivers : standings.constructors).map((item, index) => (
                  <motion.tr 
                    key={activeTab === 'drivers' ? item.driverNo : item.team}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-white/5 transition-all duration-300"
                  >
                    <td className="p-4 md:p-6 font-black italic text-slate-500 group-hover:text-white text-center text-sm md:text-xl transition-colors">
                      {item.position}
                    </td>
                    <td className="p-4 md:p-6">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div 
                          className="w-1 h-6 md:h-10 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: (TEAM_ASSETS[item.team] || TEAM_ASSETS[item.driverName] || { color: '#334155' }).color }}
                        ></div>
                        <div>
                          <div className="font-black uppercase italic tracking-tight text-white text-sm md:text-2xl group-hover:text-red-500 transition-colors">
                            {activeTab === 'drivers' ? item.driverName : item.team}
                          </div>
                          {activeTab === 'drivers' && (
                            <div className="text-[9px] md:text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                              {item.team}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 md:p-6 text-right font-black italic text-sm md:text-2xl transition-all group-hover:scale-110 origin-right">
                      {item.totalPoints}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  )
}
