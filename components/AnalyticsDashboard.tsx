
import React, { useState, useEffect } from 'react';
import { getGlobalTrends } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, AreaChart, Area } from 'recharts';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const AnalyticsDashboard: React.FC = () => {
  const [trends, setTrends] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      const data = await getGlobalTrends();
      setTrends(data);
      setLoading(false);
    };
    fetchTrends();
  }, []);

  if (loading) {
    return (
      <div className="p-8 space-y-8 animate-pulse">
        <div className="h-10 bg-slate-200 rounded-xl w-64"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="h-64 bg-slate-100 rounded-3xl"></div>
          <div className="h-64 bg-slate-100 rounded-3xl"></div>
          <div className="h-64 bg-slate-100 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      <header>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Global Market Insights</h2>
        <p className="text-slate-500 mt-2 text-lg">Real-time analytical data on international student migration and course preferences.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Countries Bar Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900">Top Destinations (Student Count)</h3>
            <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded font-black uppercase">Verified Data</span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends?.topCountries}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="country" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="studentCount" stroke="#2563eb" fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trending Courses Pie Chart */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-8">Course Interest Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trends?.trendingCourses}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="interestScore"
                >
                  {trends?.trendingCourses.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {trends?.trendingCourses.map((course: any, i: number) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                  <span className="text-slate-600 font-medium">{course.name}</span>
                </div>
                <span className="font-bold text-slate-900">{course.interestScore}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Country Deep Dive List */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span>🌍</span> Country-Specific Highlights
          </h3>
          <div className="space-y-6">
            {trends?.topCountries.map((item: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <div>
                  <p className="font-black text-blue-400">{item.country}</p>
                  <p className="text-xs text-slate-400">Most preferred: {item.popularCourse}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black">{item.studentCount.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Intl. Students</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Block */}
        <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 flex flex-col justify-center">
          <h3 className="text-2xl font-black text-slate-900 mb-4">AI Market Analysis</h3>
          <p className="text-slate-600 leading-relaxed text-lg italic">"{trends?.summary}"</p>
          <div className="mt-8 pt-8 border-t border-slate-100 flex gap-4">
            <div className="flex-1 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Market Sentiment</p>
              <p className="text-xl font-black text-emerald-900">Bullish</p>
            </div>
            <div className="flex-1 p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-[10px] font-black text-blue-600 uppercase mb-1">Growth Index</p>
              <p className="text-xl font-black text-blue-900">+12.4%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  