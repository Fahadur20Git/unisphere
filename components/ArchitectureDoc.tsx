
import React from 'react';

const ArchitectureDoc: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto pb-20">
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Enterprise Java Architecture</h2>
      <p className="text-slate-500 mb-8">System design for UniSphere AI using Spring Boot and high-performance Java microservices.</p>
      
      <div className="space-y-8">
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 font-bold text-lg">J</div>
            <h3 className="text-xl font-bold text-slate-900">1. Spring Boot Backend Layer</h3>
          </div>
          <p className="text-slate-600 mb-4 leading-relaxed">
            The core engine is built on <strong>Spring Boot 3.x</strong>, providing a reactive and scalable environment for university data processing and AI orchestration.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
            <li><strong>Spring Data JPA (Hibernate):</strong> Manages complex relational data for universities, user profiles, and peer reviews with optimized SQL indexing.</li>
            <li><strong>Spring Security + JWT:</strong> Robust authentication handling the dual-profile (Prospective vs. Student) logic and batch-based expiration.</li>
            <li><strong>Apache Maven:</strong> For dependency management of global educational datasets and Google GenAI Java SDK.</li>
          </ul>
        </section>

        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-lg">AI</div>
            <h3 className="text-xl font-bold text-slate-900">2. Java AI Integration (LLM Proxy)</h3>
          </div>
          <p className="text-slate-600 mb-4 leading-relaxed">
            Instead of client-side calls, the Java layer acts as an intelligent proxy to the <strong>Gemini 3 Pro API</strong>, enabling:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
            <li><strong>Server-Side Caching:</strong> Reducing API latency by caching common university deep dives (Redis).</li>
            <li><strong>Instruction Masking:</strong> Ensuring sensitive career goal data is scrubbed before processing by the LLM.</li>
            <li><strong>Response Normalization:</strong> Using Jackson to map unstructured AI responses to rigid Java POJOs (EntranceExams, Scholarships).</li>
          </ul>
        </section>

        <section className="bg-slate-900 p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -z-0"></div>
          <h3 className="text-xl font-bold mb-6 relative z-10">Production Java Stack Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-xs relative z-10">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-orange-400 font-black uppercase mb-1">Language</p>
              <p className="font-medium">Java 21 (LTS)</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-orange-400 font-black uppercase mb-1">Framework</p>
              <p className="font-medium">Spring Boot 3.2</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-orange-400 font-black uppercase mb-1">Database</p>
              <p className="font-medium">PostgreSQL + Vector Extension</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-orange-400 font-black uppercase mb-1">Container</p>
              <p className="font-medium">Docker / K8s</p>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 p-8 rounded-3xl border border-slate-200 border-dashed">
          <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-widest text-xs">Technical Resume Insight</h4>
          <p className="text-sm italic text-slate-500 leading-relaxed">
            "Designed and implemented a scalable <strong>Java Spring Boot microservice architecture</strong> to power an AI-driven educational platform. Engineered a <strong>custom recommendation scoring service</strong> in Java using weighted similarity algorithms. Integrated <strong>Spring Security</strong> with custom filters to enforce batch-based authentication for verified university students, ensuring high credibility of peer networking features."
          </p>
        </section>
      </div>
    </div>
  );
};

export default ArchitectureDoc;
