import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
    opacity: isDragging ? 0.5 : 1
  };

  const isDNF = result.position === 'NC' || result.position === 'DNF' || result.position === 'DQ'
  const points = POINTS_MAP[type]?.[result.position] || 0

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`group flex items-center gap-2 md:gap-4 bg-slate-900/30 p-2 md:p-3 rounded-lg border border-slate-900 hover:border-slate-800 transition-all ${isDragging ? 'shadow-2xl shadow-red-600/20 border-red-600/50' : ''}`}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 text-slate-700 hover:text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-4 md:h-4"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>
      </div>
      <div className="w-6 md:w-8 text-center font-black italic text-slate-500 group-hover:text-red-600 transition-colors text-xs md:text-base">
        {isDNF ? '—' : result.position}
      </div>
      <div className="flex-1 flex items-center gap-2 md:gap-3 min-w-0">
        <div className="w-1 h-8 md:h-10 bg-slate-800 rounded-full overflow-hidden flex-shrink-0">
          <div className="w-full h-full bg-red-600 opacity-50"></div>
        </div>
        <div className="min-w-0 truncate">
          <div className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1 truncate">{result.team}</div>
          <div className={`font-black uppercase italic tracking-tight leading-none text-xs md:text-base truncate ${isDNF ? 'text-slate-600 line-through' : 'text-white'}`}>
            {result.driver.name || result.driver}
          </div>
        </div>
      </div>
      <div className="w-10 md:w-16 text-right font-black italic text-xs md:text-lg text-slate-400 group-hover:text-white transition-colors pr-2">
        {isDNF ? '0' : points}<span className="text-[8px] md:text-[10px] ml-0.5 opacity-50 uppercase not-italic">pts</span>
      </div>
      <button 
        onClick={() => toggleDNF(result.driverNo)}
        className={`flex-shrink-0 px-2 md:px-4 py-1.5 md:py-2 rounded text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all ${isDNF ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'}`}
      >
        {isDNF ? 'Undo' : 'DNF'}
      </button>
    </div>
  );
}
