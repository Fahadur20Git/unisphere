
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Networking from './components/Networking';
import ArchitectureDoc from './components/ArchitectureDoc';
import ExamsAndScholarships from './components/ExamsAndScholarships';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import Auth from './components/Auth';
import { UserProfile, UserRole } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<UserProfile | null>(null);

  if (!user) {
    return <Auth onLogin={setUser} />;
  }

  const handleContactStudent = () => {
    setActiveTab('networking');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return user.role === UserRole.PROSPECTIVE 
          ? <Dashboard onContactStudent={handleContactStudent} /> 
          : (
            <div className="p-8">
              <h2 className="text-3xl font-bold text-slate-800">Mentor Dashboard</h2>
              <p className="text-slate-500 mt-4">Welcome back, mentor! Helping students from batch {user.universityBatch}.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Impact</p>
                  <p className="text-4xl font-black text-emerald-600 mt-2">1.2k</p>
                  <p className="text-xs text-slate-400 mt-2">Profile visits</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Mentoring</p>
                  <p className="text-4xl font-black text-blue-600 mt-2">12</p>
                  <p className="text-xs text-slate-400 mt-2">Active chats</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Trust Rating</p>
                  <p className="text-4xl font-black text-amber-600 mt-2">4.9</p>
                  <p className="text-xs text-slate-400 mt-2">Avg student rating</p>
                </div>
              </div>
            </div>
          );
      case 'networking':
        return <Networking />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'exams':
        return <ExamsAndScholarships />;
      case 'architecture':
        return <ArchitectureDoc />;
      case 'profile':
        return (
          <div className="p-8">
            <h2 className="text-3xl font-extrabold text-slate-800">My Profile</h2>
            <div className="mt-8 bg-white p-10 rounded-3xl border border-slate-200 shadow-lg max-w-3xl">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-24 h-24 rounded-3xl bg-slate-900 flex items-center justify-center text-4xl shadow-xl shadow-slate-200">
                  {user.role === UserRole.CURRENT ? '🎓' : '🎒'}
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{user.email}</p>
                  <p className="text-blue-600 font-black text-xs uppercase tracking-[0.2em]">{user.role}</p>
                  <div className="mt-2 flex gap-2">
                    <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-100">Verified</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs font-black text-slate-400 uppercase mb-2">Primary Goal</p>
                  <p className="text-sm font-bold text-slate-800 leading-relaxed">{user.careerGoals || 'Global Career Exploration'}</p>
                </div>
                {user.role === UserRole.PROSPECTIVE && user.educationLevel === 'College' && (
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-xs font-black text-slate-400 uppercase mb-2">Education Background</p>
                    <p className="text-sm font-bold text-slate-800">{user.targetMasterDegree} Aspirant</p>
                    <p className="text-xs text-slate-500 mt-1">{user.currentCollegeName}</p>
                  </div>
                )}
                {user.role === UserRole.CURRENT && (
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-xs font-black text-slate-400 uppercase mb-2">Mentor Credentials</p>
                    <p className="text-sm font-bold text-slate-800">Batch {user.universityBatch}</p>
                    <p className="text-xs text-slate-500 mt-1">ID: {user.studentId}</p>
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => setUser(null)}
                className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-black hover:bg-red-100 transition-colors mt-10 text-center"
              >
                Logout Account
              </button>
            </div>
          </div>
        );
      default:
        return <Dashboard onContactStudent={handleContactStudent} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 ml-64 min-h-screen">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${
              user.role === UserRole.CURRENT ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
            }`}>
              {user.role === UserRole.CURRENT ? 'Verified Mentor' : 'Study Prospect'}
            </span>
            <span className="text-slate-300 font-light">|</span>
            <div className="flex flex-col">
              <span className="text-slate-900 text-sm font-bold truncate max-w-[200px]">{user.email.split('@')[0]}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Current Session</span>
            </div>
          </div>
          <div className="flex gap-2">
             <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">🔔</button>
             <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">⚙️</button>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
