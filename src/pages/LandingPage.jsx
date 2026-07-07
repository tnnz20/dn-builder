import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <>
      <title>Dragon Nest Builder - Optimize Your Gear Upgrade</title>
      <meta name="description" content="Calculate and track required materials for upgrading your equipment from Unique to Legend Grade in Dragon Nest. Plan your evo hammers, gold, diamonds, and essence!" />
      <meta property="og:title" content="Dragon Nest Builder - Upgrade Calculator" />
      <meta property="og:description" content="Calculate required materials for Dragon Nest equipment upgrades." />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      
      <div className="min-h-screen bg-[#0f111a] text-slate-200 font-sans selection:bg-purple-500/30 overflow-hidden relative flex flex-col">
        {/* Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        {/* Navbar */}
        <nav className="w-full px-6 md:px-12 py-6 flex justify-between items-center relative z-10 border-b border-white/5 bg-black/10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              DN Builder
            </span>
          </div>
          <div>
            <Link to="/builder" className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all duration-300 backdrop-blur-md hover:shadow-lg hover:shadow-white/5">
              Launch App
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
              Level 50 & 60 Cap Updated
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
              Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400">Equipment</span> Upgrades
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Take the guesswork out of gearing in Dragon Nest. Track your evo hammers, calculate exact gold costs, and monitor essence requirements from Unique to Legend Grade.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link to="/builder" className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl font-bold text-lg text-white shadow-xl shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/40 w-full sm:w-auto overflow-hidden">
                <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Building Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              
              <a href="#features" className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-lg text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300 backdrop-blur-sm w-full sm:w-auto">
                Explore Features
              </a>
            </div>
          </div>
        </main>
        
        {/* Features Preview Section */}
        <section id="features" className="py-24 bg-black/40 relative z-10 border-t border-white/5 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
              Built for <span className="text-purple-400">Efficiency</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Real-time Tracking", desc: "Instantly see how many materials you need as you check off items you've already evolved.", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
                { title: "Inventory Integration", desc: "Input what you currently have in your bags to see exactly what you still need to farm.", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
                { title: "Level Specific Costs", desc: "Toggle seamlessly between Level 50 and Level 60 cap requirements for accurate planning.", icon: "M13 10V3L4 14h7v7l9-11h-7z" }
              ].map((feature, i) => (
                <div key={i} className="bg-[#1a1d2d]/60 border border-white/5 p-8 rounded-3xl hover:bg-[#1a1d2d] hover:border-purple-500/30 transition-all duration-300 group hover:-translate-y-2">
                  <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-slate-500 text-sm border-t border-white/5 relative z-10 bg-[#0f111a]">
          <p>© {new Date().getFullYear()} Dragon Nest Builder. Created for the DN Community.</p>
        </footer>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}} />
      </div>
    </>
  );
}
