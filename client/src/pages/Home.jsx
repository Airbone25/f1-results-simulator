import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-500/30">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center font-black italic tracking-tighter text-white">F1</div>
            <span className="font-bold tracking-tight text-xl uppercase">Simulator</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-red-500 transition-colors">Season 2025</a>
            <a href="#" className="hover:text-red-500 transition-colors">About</a>
          </div>
          <button 
            onClick={() => navigate('/simulator')}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-600/20"
          >
            START SIMULATING
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
            Rewrite <span className="text-red-600">Formula 1</span> <br /> History
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
            The ultimate what-if playground. Change race results, simulate DNFs, and watch the championship standings shift in real-time. 
          </p>
          
          <div className="pt-8 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate('/simulator')}
              className="bg-white text-black hover:bg-slate-200 px-8 py-4 rounded-full text-lg font-black uppercase italic transition-all shadow-xl"
            >
              Get Started
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-full text-lg font-black uppercase italic transition-all border border-slate-700">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-red-600/50 transition-colors group">
            <div className="w-12 h-12 bg-red-600/10 text-red-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m15 19 4-4"/><path d="M3.5 5.5 5 4"/><path d="M10 2.5 7 4"/><path d="M19 8.5 20.5 7"/><path d="M15 2.5 17 4"/><path d="M8 8 5 11"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-4 uppercase italic">Interactive Drag & Drop</h3>
            <p className="text-slate-400 leading-relaxed">
              Manually reorder any race finish. Just drag a driver up the field and see their points grow.
            </p>
          </div>

          <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-red-600/50 transition-colors group">
            <div className="w-12 h-12 bg-red-600/10 text-red-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m4.93 4.93 14.14 14.14"/><path d="M2 12h20"/><path d="m19.07 4.93-14.14 14.14"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-4 uppercase italic">Instant Recalculation</h3>
            <p className="text-slate-400 leading-relaxed">
              Our simulation engine instantly processes your changes across the entire 2025 season calendar.
            </p>
          </div>

          <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-red-600/50 transition-colors group">
            <div className="w-12 h-12 bg-red-600/10 text-red-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-4 uppercase italic">DNF Scenarios</h3>
            <p className="text-slate-400 leading-relaxed">
              What if a championship contender crashed out in Monaco? Toggle DNF status with one click.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2026 F1 What-If Simulator. Not affiliated with the Formula 1 group of companies.</p>
        </div>
      </footer>
    </div>
  )
}
