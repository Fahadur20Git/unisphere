
import React from 'react';

const ExamsAndScholarships: React.FC = () => {
  const exams = [
    { name: "IELTS", type: "Language", link: "https://www.ielts.org/", desc: "Standard for UK, Canada, Australia" },
    { name: "TOEFL", type: "Language", link: "https://www.ets.org/toefl", desc: "Preferred by US universities" },
    { name: "JLPT", type: "Language", link: "https://www.jlpt.jp/e/", desc: "Japanese Language Proficiency Test" },
    { name: "GRE", type: "Graduate", link: "https://www.ets.org/gre", desc: "Graduate Record Examination" },
    { name: "GMAT", type: "Business", link: "https://www.mba.com/exams/gmat", desc: "For Business schools" },
    { name: "SAT", type: "Undergrad", link: "https://satsuite.collegeboard.org/sat", desc: "Undergraduate Admissions" }
  ];

  const scholarships = [
    { title: "Fulbright Program", region: "USA", link: "https://foreign.fulbrightonline.org/", desc: "Full funding for international grad students" },
    { title: "Chevening Scholarships", region: "UK", link: "https://www.chevening.org/", desc: "UK governments global scholarship program" },
    { title: "DAAD Scholarships", region: "Germany", link: "https://www.daad.de/en/", desc: "Study and research in Germany" },
    { title: "Erasmus+", region: "Europe", link: "https://erasmus-plus.ec.europa.eu/", desc: "Exchange and full study in EU" },
    { title: "MEXT Scholarship", region: "Japan", link: "https://www.studyinjapan.go.jp/en/smap-stopj-applications-research.html", desc: "Full funding from Japanese Gov" }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Exams & Scholarships</h2>
        <p className="text-slate-500 mt-2 text-lg">Central hub for global applications and financial aid.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Exams Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-xl">📝</div>
            <h3 className="text-2xl font-bold text-slate-800">Standardized Exams</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {exams.map(exam => (
              <div key={exam.name} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-blue-300 transition-all group">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-black text-slate-900">{exam.name}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold uppercase">{exam.type}</span>
                  </div>
                  <p className="text-xs text-slate-500">{exam.desc}</p>
                </div>
                <a 
                  href={exam.link} 
                  target="_blank" 
                  className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold group-hover:bg-blue-600 transition-colors"
                >
                  Apply ↗
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Scholarships Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 text-xl">🎓</div>
            <h3 className="text-2xl font-bold text-slate-800">International Scholarships</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {scholarships.map(s => (
              <div key={s.title} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-emerald-300 transition-all group">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-black text-slate-900">{s.title}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold uppercase">{s.region}</span>
                  </div>
                  <p className="text-xs text-slate-500">{s.desc}</p>
                </div>
                <a 
                  href={s.link} 
                  target="_blank" 
                  className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold group-hover:bg-emerald-500 transition-colors"
                >
                  Details ↗
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-16 bg-slate-900 rounded-3xl p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md">
          <h3 className="text-2xl font-bold mb-4">Need help preparing?</h3>
          <p className="text-slate-400">Connect with peers who have already cleared these exams to get tips on study material and strategy.</p>
        </div>
        <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-blue-50 transition-all whitespace-nowrap">
          Contact Mentors 💬
        </button>
      </div>
    </div>
  );
};

export default ExamsAndScholarships;
