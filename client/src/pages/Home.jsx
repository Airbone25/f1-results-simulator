import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { QUOTES, THEMES } from '../data/assets'

export default function Home() {
  const navigate = useNavigate()
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [activeTheme, setActiveTheme] = useState('default')

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % QUOTES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const theme = THEMES[activeTheme]

  return (
    <div 
      className="min-h-screen text-white font-sans selection:bg-red-500/30 transition-colors duration-1000"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div 
              animate={{ rotate: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="w-8 h-8 rounded-sm flex items-center justify-center font-black italic tracking-tighter text-white"
              style={{ backgroundColor: theme.main }}
            >
              F1
            </motion.div>
            <span className="font-bold tracking-tight text-xl uppercase">Simulator</span>
          </div>
          
          <div className="hidden md:flex items-center gap-4 bg-white/5 p-1 rounded-full border border-white/10">
            {Object.entries(THEMES).map(([id, t]) => (
              <button
                key={id}
                onClick={() => setActiveTheme(id)}
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTheme === id ? 'bg-white text-black' : 'text-slate-400 hover:text-white'}`}
              >
                {t.name}
              </button>
            ))}
          </div>

          <button 
            onClick={() => navigate('/simulator')}
            className="px-5 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg"
            style={{ backgroundColor: theme.main, boxShadow: `${theme.main}33 0px 10px 20px` }}
          >
            START SIMULATING
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-20 md:pb-32">
        <div className="relative">
          {/* Background Decorative Element */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-red-600/10 to-transparent blur-3xl -z-10 opacity-50"></div>
          
          <div className="text-center space-y-6 md:space-y-10 relative z-10">
            {/* Radio Message Ticker */}
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ height: [4, 12, 4] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }}
                    className="w-1 bg-green-500 rounded-full"
                  />
                ))}
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                Incoming Radio <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
              </div>
              <div className="h-4 w-px bg-white/10 mx-1"></div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentQuoteIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-[10px] font-bold text-white uppercase italic tracking-wider truncate max-w-[150px] sm:max-w-none"
                >
                  "{QUOTES[currentQuoteIndex].text}"
                </motion.span>
              </AnimatePresence>
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.9] md:leading-[0.85]"
            >
              Rewrite <br /> 
              <span style={{ color: theme.main }}>Formula 1</span> <br /> 
              History
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto text-slate-400 text-base md:text-xl font-medium leading-relaxed px-4"
            >
              The ultimate what-if playground. Change race results, simulate DNFs, and watch the championship standings shift in real-time. 
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-4 md:pt-8 flex flex-col sm:flex-row justify-center gap-4 px-8 sm:px-0"
            >
              <button 
                onClick={() => navigate('/simulator')}
                className="bg-white text-black hover:bg-slate-200 px-10 py-5 rounded-full text-lg font-black uppercase italic transition-all shadow-2xl w-full sm:w-auto hover:scale-105 active:scale-95"
              >
                Get Started
              </button>
              <button className="bg-white/5 hover:bg-white/10 text-white px-10 py-5 rounded-full text-lg font-black uppercase italic transition-all border border-white/10 w-full sm:w-auto backdrop-blur-md">
                Watch Demo
              </button>
            </motion.div>
          </div>
        </div>

        {/* Visual Car Placeholder/Graphic */}
        <div className="mt-20 relative h-32 md:h-64 flex items-center justify-center overflow-hidden">
           <motion.div 
            initial={{ x: '-150%' }}
            animate={{ x: '150%' }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
           />
           <div className="text-[120px] md:text-[240px] font-black italic text-white/5 uppercase tracking-tighter select-none">
             SIMULATOR
           </div>
        </div>

        {/* Features Grid */}
        <div className="mt-10 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { 
              title: "Interactive Reordering", 
              desc: "Manually reorder any race finish. Just drag a driver up the field and see their points grow.",
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m15 19 4-4"/><path d="M3.5 5.5 5 4"/><path d="M10 2.5 7 4"/><path d="M19 8.5 20.5 7"/><path d="M15 2.5 17 4"/><path d="M8 8 5 11"/></svg>
            },
            { 
              title: "Live Standings", 
              desc: "Our simulation engine instantly processes your changes across the entire 2025 season calendar.",
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m4.93 4.93 14.14 14.14"/><path d="M2 12h20"/><path d="m19.07 4.93-14.14 14.14"/></svg>
            },
            { 
              title: "Custom Scenarios", 
              desc: "What if a championship contender crashed out in Monaco? Toggle DNF status with one click.",
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
            }
          ].map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-white/30 transition-colors group backdrop-blur-sm"
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${theme.main}22`, color: theme.main }}
              >
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase italic">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-[10px] font-black uppercase tracking-widest">
          <p>© 2026 F1 What-If Simulator. Not affiliated with the Formula 1 group of companies.</p>
        </div>
      </footer>
    </div>
  )
}
