
import React, { useState, useEffect } from 'react';
import { University } from '../types';
import { MOCK_REVIEWS } from '../constants';
import { analyzeSkillGap, performSentimentAnalysis, getUniversityDeepDive } from '../services/geminiService';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Radar as RadarComponent } from 'recharts';

interface Props {
  university: University;
  onBack: () => void;
  onContactStudent: () => void;
}

const UniversityDetail: React.FC<Props> = ({ university, onBack, onContactStudent }) => {
  const [skillAnalysis, setSkillAnalysis] = useState<any>(null);
  const [sentiment, setSentiment] = useState<any>(null);
  const [deepDive, setDeepDive] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(university.image);

  const gallery = [
    university.image,
    `https://picsum.photos/seed/${university.name}1/800/600`,
    `https://picsum.photos/seed/${university.name}2/800/600`,
    `https://picsum.photos/seed/${university.name}3/800/600`,
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const reviews = MOCK_REVIEWS.filter(r => r.universityId === university.id).map(r => r.comment);
      
      const [skills, senti, dive] = await Promise.all([
        analyzeSkillGap('Advanced Degree and Career Excellence', ['Self-motivation', 'Hard work'], university.description),
        performSentimentAnalysis(reviews.length > 0 ? reviews : ["High-quality teaching staff", "Modern campus facilities"]),
        getUniversityDeepDive(university.name)
      ]);
      
      setSkillAnalysis(skills);
      setSentiment(senti);
      setDeepDive(dive.data);
      setLoading(false);
    };
    fetchData();
  }, [university]);

  const radarData = [
    { subject: 'Placement', A: university.avgPlacement, fullMark: 100 },
    { subject: 'Research', A: 88, fullMark: 100 },
    { subject: 'Campus Life', A: 92, fullMark: 100 },
    { subject: 'Infrastructure', A: 95, fullMark: 100 },
    { subject: 'Scholarships', A: 70, fullMark: 100 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium"
      >
        ← Back to Discovery
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Hero & Gallery */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            <div className="relative">
              <img src={activeImg} className="w-full h-[450px] object-cover transition-all duration-500" alt={university.name} />
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {gallery.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveImg(img)}
                    className={`w-20 h-14 rounded-lg border-2 flex-shrink-0 transition-all ${activeImg === img ? 'border-white scale-105' : 'border-transparent opacity-70'}`}
                  >
                    <img src={img} className="w-full h-full object-cover rounded-md" alt="" />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">{university.name}</h2>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-lg text-slate-500 font-medium">{university.country}</p>
                    <span className="text-slate-300">|</span>
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-bold border border-blue-100">World Rank #{university.worldRanking}</span>
                    {deepDive?.officialWebsite && (
                      <a href={deepDive.officialWebsite} target="_blank" className="text-blue-600 hover:underline text-sm font-bold ml-2">Official Website ↗</a>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Tuition Fees</p>
                  <p className="text-4xl font-black text-emerald-600 tracking-tighter">${university.avgFees.toLocaleString()}<span className="text-sm text-slate-400">/yr</span></p>
                </div>
              </div>
              <p className="mt-8 text-slate-600 leading-relaxed text-xl font-light">{university.description}</p>
            </div>
          </div>

          {/* Structured Official Deep Dive */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -z-0"></div>
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-blue-200">🔍</div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Verified AI Analysis</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Fetched from official sources</p>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
                <div className="h-40 bg-slate-50 rounded-2xl"></div>
                <div className="h-40 bg-slate-50 rounded-2xl"></div>
              </div>
            ) : (
              <div className="space-y-10 relative z-10">
                {/* Infrastructure */}
                <div>
                  <h4 className="text-lg font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span> Infrastructure & Facilities
                  </h4>
                  <p className="text-slate-700 leading-relaxed">{deepDive?.infrastructure}</p>
                </div>

                {/* Exams & Scholarships Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Required Entrance Exams</h4>
                    <div className="space-y-4">
                      {deepDive?.entranceExams?.map((exam: any, i: number) => (
                        <div key={i} className="flex justify-between items-start">
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{exam.name}</p>
                            <p className="text-xs text-slate-500">{exam.details}</p>
                          </div>
                          {exam.link && (
                            <a href={exam.link} target="_blank" className="text-xs bg-white border border-slate-200 px-2 py-1 rounded text-blue-600 font-bold hover:bg-blue-50">Apply</a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                    <h4 className="font-bold text-emerald-900 mb-4 text-sm uppercase tracking-wider">Available Scholarships</h4>
                    <div className="space-y-4">
                      {deepDive?.scholarships?.map((s: any, i: number) => (
                        <div key={i}>
                          <p className="font-bold text-emerald-800 text-sm">{s.title}</p>
                          <p className="text-xs text-emerald-600/80 mb-2">{s.eligibility}</p>
                          {s.link && (
                            <a href={s.link} target="_blank" className="text-[10px] font-black text-emerald-700 underline">VIEW DETAILS</a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Languages & Faculty */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">Language Requirements</h4>
                    <ul className="space-y-2">
                      {deepDive?.languageRequirements?.map((lang: string, i: number) => (
                        <li key={i} className="flex gap-2 text-sm text-slate-600">
                          <span className="text-blue-500 font-bold">✓</span> {lang}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">Notable Professor Highlights</h4>
                    <div className="space-y-3">
                      {deepDive?.professors?.map((prof: string, i: number) => (
                        <p key={i} className="text-xs text-slate-600 leading-relaxed italic">"{prof}"</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl sticky top-24 border border-slate-800">
            <h3 className="text-2xl font-bold mb-2">Connect Now</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">The most trustworthy way to learn about a university is through those who are already there.</p>
            
            <button 
              onClick={onContactStudent}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/50 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <span>💬</span> Contact Verified Peer
            </button>
            
            <div className="mt-8 pt-8 border-t border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Match Strength</span>
                <span className="text-emerald-400 font-black">94% Perfect</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[94%]"></div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
               {MOCK_REVIEWS.filter(r => r.universityId === university.id).slice(0, 1).map(r => (
                 <div key={r.id} className="p-4 bg-white/5 rounded-2xl border border-white/10">
                   <p className="text-xs italic text-slate-300">"{r.comment}"</p>
                   <p className="text-[10px] mt-2 font-bold text-blue-400 uppercase tracking-widest">— {r.studentName}</p>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
             <h4 className="font-black text-slate-900 mb-6 uppercase tracking-tighter text-sm">Key Ranking Factors</h4>
             <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} hide />
                    <RadarComponent name="University" dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetail;
