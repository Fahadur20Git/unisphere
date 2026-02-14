
import React from 'react';

const ArchitectureDoc: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">System Architecture & AI Logic</h2>
      
      <div className="space-y-8">
        <section className="bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="text-xl font-bold text-blue-600 mb-3">1. University Recommendation Engine</h3>
          <p className="text-slate-600 mb-4">
            The platform uses a <strong>Multi-Factor Similarity Scoring (MFSS)</strong> algorithm. 
            In a production environment, this would be implemented in <strong>Python</strong> using:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li><strong>Pandas:</strong> For high-speed data frame manipulation.</li>
            <li><strong>Scikit-Learn:</strong> For Cosine Similarity calculations between user vectors and university vectors.</li>
            <li><strong>TF-IDF Vectorization:</strong> To analyze university focus tags vs. student career statements.</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="text-xl font-bold text-indigo-600 mb-3">2. NLP & Sentiment Analysis</h3>
          <p className="text-slate-600 mb-4">
            We leverage <strong>Gemini 3 Flash</strong> to perform real-time NLP tasks:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li><strong>Sentiment Classification:</strong> Analyzing peer reviews to classify them as Positive/Neutral/Negative.</li>
            <li><strong>Zero-Shot Summarization:</strong> Distilling hundreds of reviews into a single "vibe" summary.</li>
            <li><strong>Skill Gap Analysis:</strong> Comparing unstructured career goals with university curricula to find specific missing skills.</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="text-xl font-bold text-emerald-600 mb-3">3. Database Schema (Production Ready)</h3>
          <pre className="bg-slate-50 p-4 rounded text-xs font-mono text-slate-700 overflow-x-auto">
{`Users {
  id: uuid,
  email: string,
  role: Enum(Prospect, Student),
  is_verified: boolean,
  profile_data: JSONB // gpa, budget, skills
}

Universities {
  id: uuid,
  name: string,
  metadata: JSONB // fees, placement_rate, ranking
}

Reviews {
  id: uuid,
  user_id: fk,
  university_id: fk,
  sentiment_score: float,
  content: text,
  credibility_score: float
}`}
          </pre>
        </section>

        <section className="bg-slate-900 p-8 rounded-xl text-white">
          <h3 className="text-xl font-bold mb-4">Recruiter Focus: Resume Summary</h3>
          <div className="border-l-4 border-blue-500 pl-4 space-y-4">
            <p className="text-sm italic text-slate-300">
              "Architected and developed a full-stack AI-driven EdTech platform connecting prospective study-abroad students with university matches using a <strong>custom recommendation scoring engine</strong>. Integrated <strong>LLM-based NLP pipelines</strong> for sentiment analysis of peer reviews and dynamic skill-gap alignment. Designed a <strong>modular React/TypeScript frontend</strong> with D3/Recharts data visualizations and real-time state management."
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArchitectureDoc;
