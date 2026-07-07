import { useState } from 'react';
import './App.css';

const upgradeData = {
  50: [
    { id: 'wep50', part: 'Weapon', hammer: 2, gold: 1600, diamond: 400, essence: 400 },
    { id: 'sub50', part: 'Sub Weapon', hammer: 2, gold: 800, diamond: 400, essence: 400 },
    { id: 'helm50', part: 'Helm', hammer: 2, gold: 320, diamond: 120, essence: 120 },
    { id: 'tops50', part: 'Tops', hammer: 2, gold: 560, diamond: 120, essence: 120 },
    { id: 'bot50', part: 'Bottoms', hammer: 2, gold: 400, diamond: 120, essence: 120 },
    { id: 'glove50', part: 'Gloves', hammer: 2, gold: 160, diamond: 120, essence: 120 },
    { id: 'shoe50', part: 'Shoes', hammer: 2, gold: 160, diamond: 120, essence: 120 }
  ],
  60: [
    { id: 'wep60', part: 'Weapon', hammer: 2, gold: 3200, diamond: 800, essence: 800 },
    { id: 'sub60', part: 'Sub Weapon', hammer: 2, gold: 1600, diamond: 800, essence: 800 },
    { id: 'helm60', part: 'Helm', hammer: 2, gold: 640, diamond: 240, essence: 240 },
    { id: 'tops60', part: 'Tops', hammer: 2, gold: 1120, diamond: 240, essence: 240 },
    { id: 'bot60', part: 'Bottoms', hammer: 2, gold: 800, diamond: 240, essence: 240 },
    { id: 'glove60', part: 'Gloves', hammer: 2, gold: 320, diamond: 240, essence: 240 },
    { id: 'shoe60', part: 'Shoes', hammer: 2, gold: 320, diamond: 240, essence: 240 }
  ]
};

function App() {
  const [level, setLevel] = useState('50');
  const [completed, setCompleted] = useState({});
  const [inventory, setInventory] = useState({
    hammer: '',
    gold: '',
    diamond: '',
    essence: ''
  });

  const toggleCompleted = (id) => {
    setCompleted(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleInventoryChange = (e) => {
    const { name, value } = e.target;
    // Allow empty string, otherwise parse as number
    if (value === '') {
      setInventory(prev => ({ ...prev, [name]: '' }));
    } else {
      const num = parseInt(value.replace(/\D/g, ''), 10);
      setInventory(prev => ({ ...prev, [name]: isNaN(num) ? '' : num }));
    }
  };

  const currentData = upgradeData[level];
  
  const totals = currentData.reduce((acc, item) => {
    if (!completed[item.id]) {
      acc.hammer += item.hammer;
      acc.gold += item.gold;
      acc.diamond += item.diamond;
      acc.essence += item.essence;
    }
    return acc;
  }, { hammer: 0, gold: 0, diamond: 0, essence: 0 });

  const evolvedCount = currentData.filter(i => completed[i.id]).length;
  const progressPercent = Math.round((evolvedCount / currentData.length) * 100);

  const getShortfall = (required, owned) => {
    const amount = Number(owned) || 0;
    return Math.max(0, required - amount);
  };

  const isEnough = (required, owned) => {
    return (Number(owned) || 0) >= required;
  };

  const renderSummaryRow = (label, required, owned, colorClass, shadowClass) => {
    const shortfall = getShortfall(required, owned);
    const enough = isEnough(required, owned);
    
    return (
      <div className="bg-black/20 border border-white/5 p-4 rounded-2xl transition-all duration-300 hover:bg-black/30 hover:scale-[1.02]">
        <div className="flex justify-between items-center">
          <span className="text-slate-300 font-medium text-sm">{label}</span>
          <span className={`text-xl font-bold font-mono ${colorClass} ${shadowClass}`}>
            {required.toLocaleString()}
          </span>
        </div>
        
        {required > 0 && (
          <div className="flex justify-between items-center text-xs mt-3 pt-3 border-t border-white/5">
            <span className="text-slate-500 uppercase tracking-wider font-semibold">Still Need:</span>
            {enough ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1 bg-emerald-400/10 px-2 py-1 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Complete
              </span>
            ) : (
              <span className="text-rose-400 font-mono font-bold bg-rose-400/10 px-2 py-1 rounded-md">
                {shortfall.toLocaleString()}
              </span>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0f111a] text-slate-200 p-4 md:p-8 font-sans selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="text-center space-y-4 pt-10 pb-6 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] -z-10"></div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 drop-shadow-sm tracking-tight">
            Dragon Nest Builder
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Track your progress upgrading equipment from <span className="text-fuchsia-400 font-semibold">Unique</span> to <span className="text-amber-400 font-semibold">Legend</span> Grade.
          </p>
        </header>

        <div className="flex flex-col xl:flex-row gap-8">
          {/* Main Table Section */}
          <div className="flex-1 bg-[#1a1d2d]/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/5 relative overflow-hidden group flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Equipment Checklist
              </h2>
              
              <div className="flex bg-[#0f111a] rounded-xl p-1 border border-white/10">
                <button 
                  onClick={() => setLevel('50')}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${level === '50' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/20 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  Level 50
                </button>
                <button 
                  onClick={() => setLevel('60')}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${level === '60' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/20 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  Level 60
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#0f111a]/50 flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 text-sm uppercase tracking-wider border-b border-white/5 bg-white/5">
                    <th className="p-5 font-semibold">Part</th>
                    <th className="p-5 font-semibold">Hammer</th>
                    <th className="p-5 font-semibold">Gold</th>
                    <th className="p-5 font-semibold">Diamond</th>
                    <th className="p-5 font-semibold">Essence</th>
                    <th className="p-5 font-semibold text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {currentData.map((item) => {
                    const isDone = completed[item.id];
                    return (
                      <tr 
                        key={item.id} 
                        onClick={() => toggleCompleted(item.id)}
                        className={`transition-all duration-300 cursor-pointer hover:bg-white/5 ${isDone ? 'opacity-40 bg-black/20 hover:opacity-60' : ''}`}
                      >
                        <td className="p-5 font-medium text-slate-200">
                          <span className={`${isDone ? 'line-through text-slate-500' : ''}`}>{item.part}</span>
                        </td>
                        <td className="p-5 text-slate-300">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                            {item.hammer}
                          </div>
                        </td>
                        <td className="p-5 text-yellow-500/90 font-mono">{item.gold.toLocaleString()}</td>
                        <td className="p-5 text-cyan-400/90 font-mono">{item.diamond.toLocaleString()}</td>
                        <td className="p-5 text-emerald-400/90 font-mono">{item.essence.toLocaleString()}</td>
                        <td className="p-5 text-center">
                          <label className="relative flex items-center justify-center p-2 rounded-full cursor-pointer" onClick={e => e.stopPropagation()}>
                            <input 
                              type="checkbox" 
                              checked={!!isDone}
                              onChange={() => toggleCompleted(item.id)}
                              className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded-md shadow hover:shadow-md border border-slate-600 bg-slate-800/50 checked:bg-purple-500 checked:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                            />
                            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                          </label>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400 font-medium">Evolution Progress</span>
                <span className="text-purple-300 font-bold">{progressPercent}%</span>
              </div>
              <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-700 ease-out relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                </div>
              </div>
              <p className="text-xs text-center text-slate-500 mt-4">
                {evolvedCount} of {currentData.length} items evolved
              </p>
            </div>
            
          </div>

          {/* Right Column: Inventory & Totals */}
          <div className="w-full xl:w-96 space-y-6 flex flex-col">
            
            {/* Inventory Card */}
            <div className="bg-[#1a1d2d]/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/5 relative overflow-hidden group">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
                <div className="p-2 bg-blue-500/20 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-blue-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                My Inventory
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1 xl:col-span-2">
                  <label className="block text-xs text-slate-400 mb-1.5 ml-1 uppercase tracking-wider font-semibold">Evo Hammer</label>
                  <input 
                    type="text" 
                    name="hammer"
                    value={inventory.hammer}
                    onChange={handleInventoryChange}
                    placeholder="0"
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-slate-600 font-mono"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1 xl:col-span-2">
                  <label className="block text-xs text-slate-400 mb-1.5 ml-1 uppercase tracking-wider font-semibold">Gold</label>
                  <input 
                    type="text" 
                    name="gold"
                    value={inventory.gold}
                    onChange={handleInventoryChange}
                    placeholder="0"
                    className="w-full bg-black/30 border border-yellow-500/20 rounded-xl px-4 py-2.5 text-yellow-400 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all placeholder-slate-600 font-mono"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1 xl:col-span-2">
                  <label className="block text-xs text-slate-400 mb-1.5 ml-1 uppercase tracking-wider font-semibold">Diamond</label>
                  <input 
                    type="text" 
                    name="diamond"
                    value={inventory.diamond}
                    onChange={handleInventoryChange}
                    placeholder="0"
                    className="w-full bg-black/30 border border-cyan-500/20 rounded-xl px-4 py-2.5 text-cyan-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder-slate-600 font-mono"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1 xl:col-span-2">
                  <label className="block text-xs text-slate-400 mb-1.5 ml-1 uppercase tracking-wider font-semibold">Essence</label>
                  <input 
                    type="text" 
                    name="essence"
                    value={inventory.essence}
                    onChange={handleInventoryChange}
                    placeholder="0"
                    className="w-full bg-black/30 border border-emerald-500/20 rounded-xl px-4 py-2.5 text-emerald-400 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder-slate-600 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-br from-[#1a1d2d] to-[#251e3a] rounded-3xl shadow-2xl p-6 md:p-8 border border-purple-500/20 sticky top-8 relative overflow-hidden flex-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-[60px]"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-[60px]"></div>
              
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-white relative z-10">
                <div className="p-2 bg-purple-500/20 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-purple-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Required Materials
              </h2>
              
              <div className="space-y-4 relative z-10">
                {renderSummaryRow(`Lv.${level} Hammer`, totals.hammer, inventory.hammer, 'text-white', '')}
                {renderSummaryRow('Gold', totals.gold, inventory.gold, 'text-yellow-400', 'drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]')}
                {renderSummaryRow('Diamond', totals.diamond, inventory.diamond, 'text-cyan-400', 'drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]')}
                {renderSummaryRow('Essence of Life', totals.essence, inventory.essence, 'text-emerald-400', 'drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]')}
              </div>
            </div>
            
          </div>

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}

export default App;
