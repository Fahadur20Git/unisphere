
import React, { useState } from 'react';
import { UserRole, UserProfile } from '../types';

interface AuthProps {
  onLogin: (user: UserProfile) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState<UserRole>(UserRole.PROSPECTIVE);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [studentId, setStudentId] = useState('');
  const [batch, setBatch] = useState(''); // e.g. 2023-2027
  const [eduLevel, setEduLevel] = useState<'School' | 'College'>('School');
  const [collegeName, setCollegeName] = useState('');
  const [targetDegree, setTargetDegree] = useState('');
  const [verificationFile, setVerificationFile] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVerificationFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateCurrentStudent = () => {
    if (!batch.includes('-')) {
      setError('Please enter batch in format YYYY-YYYY');
      return false;
    }
    const endYearStr = batch.split('-')[1];
    const endYear = parseInt(endYearStr);
    const currentYear = new Date().getFullYear();
    
    if (isNaN(endYear)) {
      setError('Invalid batch year format.');
      return false;
    }
    
    if (endYear < currentYear) {
      setError('Graduated students are not allowed to join as current mentors. Only currently pursuing students can sign up.');
      return false;
    }

    if (!isLogin && !verificationFile) {
      setError('You must upload a photo or PDF of your Student ID to verify your status.');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (activeTab === UserRole.CURRENT) {
      if (!validateCurrentStudent()) return;
      
      onLogin({
        email,
        role: UserRole.CURRENT,
        studentId,
        universityBatch: batch,
        verificationDocUrl: verificationFile || undefined,
        gpa: 4.0,
        budget: 0,
        careerGoals: 'N/A (Current Mentor)',
        preferredCountries: [],
        skills: []
      });
    } else {
      onLogin({
        email,
        role: UserRole.PROSPECTIVE,
        dob,
        educationLevel: eduLevel,
        currentCollegeName: eduLevel === 'College' ? collegeName : undefined,
        currentBatch: eduLevel === 'College' ? batch : undefined,
        targetMasterDegree: eduLevel === 'College' ? targetDegree : undefined,
        gpa: 3.5,
        budget: 50000,
        careerGoals: targetDegree ? `I want to Master in ${targetDegree}` : 'Searching for opportunities',
        preferredCountries: ['USA', 'UK'],
        skills: ['Enthusiastic', 'Fast Learner']
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
        <div className="bg-slate-900 p-8 text-white text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            UniSphere AI
          </h1>
          <p className="text-slate-400 mt-2">Global Education Network</p>
        </div>

        <div className="flex border-b border-slate-100">
          <button
            onClick={() => setActiveTab(UserRole.PROSPECTIVE)}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeTab === UserRole.PROSPECTIVE ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Prospective
          </button>
          <button
            onClick={() => setActiveTab(UserRole.CURRENT)}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeTab === UserRole.CURRENT ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Current Student
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder={activeTab === UserRole.CURRENT ? "College or Personal Email" : "your@email.com"}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {activeTab === UserRole.CURRENT ? (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Student ID Number</label>
                <input
                  required
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="e.g. 2023ABC123"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Batch (e.g. 2023-2027)</label>
                <input
                  required
                  type="text"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="YYYY-YYYY"
                />
              </div>
              {!isLogin && (
                <div className="space-y-1 pt-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Upload Student ID (Photo/PDF)</label>
                  <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors">
                    <input
                      required
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {verificationFile ? (
                      <div className="text-emerald-600 font-bold text-sm flex items-center justify-center gap-2">
                        <span>📄</span> ID File Selected
                      </div>
                    ) : (
                      <div className="text-slate-400 text-sm">
                        Click or drag ID to verify status
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Date of Birth</label>
                <input
                  required
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Education Level</label>
                <select
                  value={eduLevel}
                  onChange={(e) => setEduLevel(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="School">School Student</option>
                  <option value="College">College Student</option>
                </select>
              </div>

              {eduLevel === 'College' && (
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Current College Name</label>
                    <input
                      required
                      type="text"
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Batch</label>
                    <input
                      required
                      type="text"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g. 2021-2025"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Target Degree (Master's)</label>
                    <input
                      required
                      type="text"
                      value={targetDegree}
                      onChange={(e) => setTargetDegree(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="I want to master in..."
                    />
                  </div>
                </div>
              )}
            </>
          )}

          <button
            type="submit"
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 mt-4 ${
              activeTab === UserRole.PROSPECTIVE ? 'bg-blue-600 hover:bg-blue-500' : 'bg-emerald-600 hover:bg-emerald-500'
            }`}
          >
            {isLogin ? 'Sign In' : 'Finish Registration'}
          </button>

          <p className="text-center text-xs text-slate-400 mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 font-bold text-slate-800 hover:underline"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;
