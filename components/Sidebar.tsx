
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Recommendations', icon: '🎯' },
    { id: 'networking', label: 'Peer Network', icon: '🤝' },
    { id: 'exams', label: 'Exams & Scholarships', icon: '📝' },
    { id: 'profile', label: 'My Profile', icon: '👤' },
    { id: 'architecture', label: 'System Logic', icon: '🏗️' },
  ];

  return (
    <div className="w-64 bg-slate-900 h-screen text-white flex flex-col fixed left-0 top-0 z-50 shadow-2xl">
      <div className="p-8">
        <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent tracking-tighter">
          UNISPHERE AI
        </h1>
        <div className="h-1 w-12 bg-blue-600 mt-2 rounded-full"></div>
      </div>
      
      <nav className="flex-1 px-4 mt-4 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl mb-2 transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 translate-x-1' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-bold text-sm tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-8 border-t border-slate-800 bg-slate-950/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
            <img src="https://picsum.photos/seed/user/40" alt="Avatar" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">Study Explorer</p>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Global Account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
