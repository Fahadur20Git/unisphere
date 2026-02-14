
import React from 'react';
import { RecommendationResult } from '../types';

interface Props {
  result: RecommendationResult;
  onSelect: (uniId: string) => void;
}

const RecommendationCard: React.FC<Props> = ({ result, onSelect }) => {
  const { university, score, reasons } = result;

  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-emerald-500 border-emerald-500';
    if (s >= 60) return 'text-blue-500 border-blue-500';
    return 'text-amber-500 border-amber-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={university.image} 
          alt={university.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className={`absolute top-4 right-4 bg-white px-3 py-1 rounded-full border-2 font-bold shadow-lg ${getScoreColor(score)}`}>
          {score}% Match
        </div>
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded text-xs font-semibold">
          QS Rank: #{university.worldRanking}
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-slate-800">{university.name}</h3>
            <p className="text-sm text-slate-500 flex items-center gap-1">
              📍 {university.country}
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {university.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">Why it fits:</p>
          <ul className="text-sm text-slate-600 space-y-1">
            {reasons.slice(0, 2).map((reason, idx) => (
              <li key={idx} className="flex gap-2 items-start">
                <span className="text-emerald-500 text-xs mt-0.5">✔</span>
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex gap-3">
          <button 
            onClick={() => onSelect(university.id)}
            className="flex-1 bg-slate-900 text-white py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            View Details
          </button>
          <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">
            💬
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
