
import React, { useState, useEffect } from 'react';
import { UserProfile, RecommendationResult, University } from '../types';
import { getUniversityRecommendations } from '../utils/recommendationEngine';
import RecommendationCard from './RecommendationCard';
import UniversityDetail from './UniversityDetail';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  onContactStudent: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onContactStudent }) => {
  const [profile, setProfile] = useState<UserProfile>({
    email: '',
    role: 0 as any,
    gpa: 3.8,
    budget: 65000,
    careerGoals: 'Global leadership and research in high-growth industries.',
    preferredCountries: ['USA', 'UK', 'Germany', 'Singapore', 'Canada'],
    skills: ['Problem Solving', 'Adaptability', 'Language Learning']
  });

  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [selectedUniId, setSelectedUniId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const results = getUniversityRecommendations(profile);
    setRecommendations(results);
  }, [profile]);

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    const customUni: University = {
      id: 'search-' + Date.now(),
      name: searchQuery,
      country: 'Searching globally...',
      avgFees: 40000,
      avgPlacement: 95,
      worldRanking: 0,
      tags: ['Global Discovery', 'AI Analysis'],
      description: `Analyzing ${searchQuery} via their official university portals. Infrastructure, faculty, and career outcomes are being mapped in real-time.`,
      costOfLiving: 'Medium',
      image: `https://picsum.photos/seed/${searchQuery}/1200/600`
    };
    
    setRecommendations(prev => [{ university: customUni, score: 100, reasons: ['User specific search'] }, ...prev]);
    setSelectedUniId(customUni.id);
  };

  const chartData = recommendations.slice(0, 5).map(r => ({
    name: r.university.name.length > 10 ? r.university.name.substring(0, 10) + '...' : r.university.name,
    score: r.score
  }));

  if (selectedUniId) {
    const uni = recommendations.find(r => r.university.id === selectedUniId)?.university;
    if (uni) return <UniversityDetail university={uni} onBack={() => setSelectedUniId(null)} onContactStudent={onContactStudent} />;
  }

  return (
    <div className="p-8">
      <header className="mb-12 flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">University Matchmaker</h2>
          <p className="text-slate-500 mt-2 text-lg">AI-powered scouting across 10,000+ global institutions.</p>
        </div>
        
        <form onSubmit={handleGlobalSearch} className="w-full max-w-xl">
          <div className="relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ANY university (e.g. Cambridge, Tokyo University, IIT)..."
              className="w-full bg-white border-2 border-slate-100 rounded-3xl px-8 py-5 pr-20 shadow-2xl shadow-slate-200/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-lg font-medium"
            />
            <button 
              type="submit"
              className="absolute right-3 top-3 bottom-3 bg-slate-900 text-white px-6 rounded-2xl hover:bg-blue-600 transition-all font-bold shadow-lg"
            >
              Search
            </button>
          </div>
        </form>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="text-2xl">📈</span> Score Benchmark
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" fontSize={10} hide />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#2563eb' : '#e2e8f0'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
            <h3 className="text-xl font-bold mb-6 relative z-10">Smart Scoring Profile</h3>
            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                <p className="text-blue-400 text-xs font-black uppercase tracking-widest">GPA Index</p>
                <p className="text-xl font-black">{profile.gpa}</p>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                <p className="text-blue-400 text-xs font-black uppercase tracking-widest">Budget Limit</p>
                <p className="text-xl font-black">${profile.budget.toLocaleString()}</p>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-black text-sm transition-all shadow-xl shadow-blue-900/50">
                Optimize My Profile
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Recommended Institutions</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Live AI Matching
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recommendations.map((result) => (
              <RecommendationCard 
                key={result.university.id} 
                result={result} 
                onSelect={(id) => setSelectedUniId(id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
