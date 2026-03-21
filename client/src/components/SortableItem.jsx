import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TEAM_ASSETS, DRIVER_ASSETS } from '../data/assets';

const POINTS_MAP = {
  'Race': {
    '1': 25, '2': 18, '3': 15, '4': 12, '5': 10,
    '6': 8, '7': 6, '8': 4, '9': 2, '10': 1
  },
  'Sprint': {
    '1': 8, '2': 7, '3': 6, '4': 5, '5': 4,
    '6': 3, '7': 2, '8': 1
  }
}

export default function SortableItem({ id, result, toggleDNF, type = 'Race' }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.8 : 1
  };

  const isDNF = result.position === 'NC' || result.position === 'DNF' || result.position === 'DQ'
  const points = POINTS_MAP[type]?.[result.position] || 0
  const teamAsset = TEAM_ASSETS[result.team] || { color: '#334155' }
  const driverAsset = DRIVER_ASSETS[result.driverNo]

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`group flex items-center gap-2 md:gap-4 bg-white/5 p-2 md:p-3 rounded-2xl border border-white/5 hover:border-white/20 transition-all ${isDragging ? 'shadow-2xl shadow-black border-white/30 scale-[1.02]' : ''} backdrop-blur-sm`}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-2 text-slate-600 hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>
      </div>
      
      <div className="w-8 md:w-12 text-center font-black italic text-slate-500 group-hover:text-white transition-colors text-sm md:text-xl">
        {isDNF ? '—' : result.position}
      </div>

      <div className="flex-1 flex items-center gap-3 md:gap-4 min-w-0">
        <div className="relative flex-shrink-0">
          <div 
            className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 overflow-hidden bg-slate-800 transition-transform group-hover:scale-110"
            style={{ borderColor: teamAsset.color }}
          >
            {driverAsset?.headshot ? (
              <img src={driverAsset.headshot} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-black italic text-[10px] opacity-30">
                {result.driverNo}
              </div>
            )}
          </div>
          <div 
            className="absolute -bottom-1 -right-1 w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-slate-950 flex items-center justify-center text-[6px] md:text-[8px] font-black text-white"
            style={{ backgroundColor: teamAsset.color }}
          >
            {driverAsset?.code || result.driverNo}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] leading-none mb-1 truncate group-hover:text-slate-300 transition-colors">
            {result.team}
          </div>
          <div className={`font-black uppercase italic tracking-tighter leading-none text-sm md:text-2xl truncate ${isDNF ? 'text-slate-600 line-through' : 'text-white'}`}>
            {result.driver.name || result.driver}
          </div>
        </div>
      </div>

      <div className="w-12 md:w-20 text-right pr-2">
        <div className="font-black italic text-sm md:text-2xl text-slate-400 group-hover:text-white transition-colors">
          {isDNF ? '0' : points}
        </div>
        <div className="text-[6px] md:text-[8px] font-black uppercase tracking-widest text-slate-600 group-hover:text-red-500 transition-colors">
          Points
        </div>
      </div>

      <button 
        onClick={() => toggleDNF(result.driverNo)}
        className={`flex-shrink-0 px-3 md:px-5 py-2 md:py-3 rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all ${isDNF ? 'bg-red-600 text-white shadow-lg shadow-red-600/40' : 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-white border border-white/5'}`}
      >
        {isDNF ? 'Undo' : 'DNF'}
      </button>
    </div>
  );
}
