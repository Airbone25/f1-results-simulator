import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove
} from '@dnd-kit/sortable';

import SortableItem from '../components/SortableItem';
import StandingsView from '../components/StandingsView';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function Simulator() {
  const navigate = useNavigate()
  const [races, setRaces] = useState([])
  const [selectedRace, setSelectedRace] = useState(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [loadingResults, setLoadingResults] = useState(false)
  const [localOverrides, setLocalOverrides] = useState({})
  const [standings, setStandings] = useState(null)
  const [calculating, setCalculating] = useState(false)
  const [showStandings, setShowStandings] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setLoading(true)
    fetch(`${API_URL}/api/races`)
      .then(res => res.json())
      .then(data => {
        setRaces(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch races:", err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (selectedRace !== null) {
      setLoadingResults(true)
      fetch(`${API_URL}/api/races/${selectedRace}`)
        .then(res => res.json())
        .then(data => {
          const race = races[selectedRace]
          const raceKey = `${race.raceTitle}|${race.type}`
          const overrides = localOverrides[raceKey] || {}

          const initialResults = data.results.map(r => {
            if (overrides[r.driverNo]) {
              return { ...r, ...overrides[r.driverNo] }
            }
            return r
          })

          setResults(initialResults)
          setLoadingResults(false)
        })
        .catch(err => {
          console.error("Failed to fetch results:", err)
          setLoadingResults(false)
        })
    }
  }, [selectedRace, races])

  const handleRecalculate = () => {
    setCalculating(true)
    fetch(`${API_URL}/api/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ overrides: localOverrides })
    })
      .then(res => res.json())
      .then(data => {
        setStandings(data)
        setCalculating(false)
        setShowStandings(true)
      })
      .catch(err => {
        console.error("Simulation failed:", err)
        setCalculating(false)
      })
  }

  const updateOverrides = (updatedResults) => {
    const race = races[selectedRace]
    const raceKey = `${race.raceTitle}|${race.type}`
    
    const newOverrides = { ...localOverrides }
    newOverrides[raceKey] = {}

    updatedResults.forEach(r => {
        newOverrides[raceKey][r.driverNo] = { position: r.position }
    })

    setLocalOverrides(newOverrides)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setResults((items) => {
        const oldIndex = items.findIndex(i => i.driverNo === active.id);
        const newIndex = items.findIndex(i => i.driverNo === over.id);
        
        const newOrder = arrayMove(items, oldIndex, newIndex);
        
        let posCounter = 1;
        const finalOrder = newOrder.map(item => {
          const isDNF = item.position === 'NC' || item.position === 'DNF' || item.position === 'DQ'
          if (isDNF) return item;
          return { ...item, position: (posCounter++).toString() }
        })

        updateOverrides(finalOrder)
        return finalOrder;
      });
    }
  }

  const toggleDNF = (driverNo) => {
    setResults(prev => {
      const currentResult = prev.find(r => r.driverNo === driverNo)
      const isCurrentlyDNF = currentResult.position === 'NC' || currentResult.position === 'DNF' || currentResult.position === 'DQ'
      
      const newResults = prev.map(r => {
        if (r.driverNo === driverNo) {
          return { ...r, position: isCurrentlyDNF ? "20" : "NC" }
        }
        return r
      })

      let posCounter = 1;
      const finalResults = newResults.map(item => {
        const isDNF = item.position === 'NC' || item.position === 'DNF' || item.position === 'DQ'
        if (isDNF) return item;
        return { ...item, position: (posCounter++).toString() }
      })

      updateOverrides(finalResults)
      return finalResults
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-500/30">
      {/* Simulator Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 h-16 flex items-center px-4 justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => navigate('/')}
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 md:gap-2 text-xs md:text-sm font-bold uppercase tracking-tight"
          >
            ← <span className="hidden sm:inline">Back</span>
          </button>
          <div className="h-6 w-px bg-slate-800"></div>
          <span className="font-black italic text-red-600 uppercase text-sm md:text-base">Simulator</span>
        </div>
        <button 
          disabled={calculating}
          onClick={handleRecalculate}
          className={`bg-white text-black px-3 md:px-4 py-1.5 rounded text-[10px] md:text-xs font-black uppercase italic transition-all ${calculating ? 'opacity-50 animate-pulse' : 'hover:bg-red-600 hover:text-white'}`}
        >
          {calculating ? 'Calculating...' : 'Recalculate'}
        </button>
      </nav>

      <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
        {/* Sidebar: Race List - Scrollable horizontal on mobile, vertical on desktop */}
        <aside className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-800 flex-shrink-0 bg-slate-900/20 flex flex-col">
          <div className="p-3 md:p-4 border-b border-slate-800 hidden md:block">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">2025 Calendar</h2>
          </div>
          <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto divide-x md:divide-x-0 md:divide-y divide-slate-900 flex-1">
            {loading ? (
              <div className="p-4 md:p-8 text-center text-slate-500 text-[10px] md:text-sm animate-pulse italic whitespace-nowrap">Loading...</div>
            ) : (
              races.map((race, index) => (
                <button
                  key={index}
                  onClick={() => {
                      setSelectedRace(index)
                      setShowStandings(false)
                  }}
                  className={`flex-shrink-0 md:flex-shrink-1 w-48 md:w-full text-left p-3 md:p-4 transition-all hover:bg-slate-800/50 group ${selectedRace === index && !showStandings ? 'bg-red-600/10 border-b-2 md:border-b-0 md:border-l-4 border-red-600' : 'border-b-2 md:border-b-0 md:border-l-4 border-transparent'}`}
                >
                  <div className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-hover:text-red-500 transition-colors">Round {index + 1}</div>
                  <div className={`text-xs md:text-sm font-black uppercase italic tracking-tight truncate ${selectedRace === index && !showStandings ? 'text-white' : 'text-slate-300'}`}>
                    {race.raceTitle.split(' 2025')[0]}
                  </div>
                </button>
              ))
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-4 md:p-8">
          {showStandings ? (
            <StandingsView 
              standings={standings} 
              onClose={() => setShowStandings(false)} 
            />
          ) : selectedRace === null ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 px-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 md:hidden"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 hidden md:block"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-black uppercase italic tracking-tight">Select a Race</h3>
                <p className="text-slate-500 text-xs md:text-sm">Pick a round to start tweaking history.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
              <header className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-900 pb-4 md:pb-6 gap-4">
                 <div>
                  <div className="text-red-600 font-black italic uppercase tracking-tighter text-[10px] md:text-sm mb-1">Editing Round {selectedRace + 1}</div>
                  <h2 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter leading-none">{races[selectedRace].raceTitle.split(' 2025')[0]}</h2>
                  <div className="text-slate-500 text-[9px] md:text-xs font-bold uppercase tracking-widest mt-1 md:mt-2">Official {races[selectedRace].type} Results</div>
                 </div>
                 <div className="sm:text-right flex items-center sm:flex-col gap-2 sm:gap-1">
                    <div className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:block">Status</div>
                    <div className="bg-amber-500/10 text-amber-500 px-2 md:px-3 py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest border border-amber-500/20">Staging Changes</div>
                 </div>
              </header>
              
              <div className="space-y-2">
                {loadingResults ? (
                  <div className="py-20 text-center text-slate-500 animate-pulse uppercase font-black italic">Retrieving Grid...</div>
                ) : (
                  <DndContext 
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext 
                      items={results.map(r => r.driverNo)}
                      strategy={verticalListSortingStrategy}
                    >
                      {results.map((result) => (
                        <SortableItem 
                          key={result.driverNo} 
                          id={result.driverNo} 
                          result={result} 
                          toggleDNF={toggleDNF}
                          type={races[selectedRace]?.type || 'Race'}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
