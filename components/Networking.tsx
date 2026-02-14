
import React, { useState } from 'react';

const Networking: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: '1', sender: 'Lukas (Student @ TUM)', text: 'Hey there! Saw you were interested in Munich. Any questions about the engineering courses?', time: '10:05 AM' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), sender: 'You', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
  };

  return (
    <div className="p-8 h-full max-w-5xl mx-auto flex flex-col">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800">Peer Network</h2>
        <p className="text-slate-500">Connect with verified current students.</p>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[500px]">
        {/* Contact List */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <h4 className="font-bold text-sm text-slate-800">Available Mentors</h4>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { name: 'Lukas Meyer', uni: 'TUM', status: 'online' },
              { name: 'Alex Chen', uni: 'Stanford', status: 'online' },
              { name: 'Sarah J.', uni: 'Oxford', status: 'away' },
            ].map(user => (
              <button key={user.name} className="w-full p-4 flex items-center gap-3 hover:bg-slate-50 transition-colors text-left group">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${user.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                </div>
                <div>
                  <p className="text-sm font-bold group-hover:text-blue-600 transition-colors">{user.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{user.uni}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-indigo-500"></div>
               <div>
                 <p className="font-bold text-sm">Lukas Meyer (Student @ TUM)</p>
                 <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-black">VERIFIED PEER</span>
               </div>
             </div>
             <div className="flex gap-2">
               <button className="p-2 hover:bg-slate-100 rounded">📞</button>
               <button className="p-2 hover:bg-slate-100 rounded">📹</button>
             </div>
          </div>

          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            {messages.map(msg => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                  msg.sender === 'You' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-100 text-slate-800 rounded-tl-none'
                }`}>
                  <p>{msg.text}</p>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{msg.time}</p>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-100">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about placements, lifestyle, or fees..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={sendMessage}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-500 transition-all active:scale-95"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Networking;
