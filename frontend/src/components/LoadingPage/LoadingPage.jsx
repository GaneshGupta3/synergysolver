import React from 'react';

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center">
      {/* Logo and loader only */}
      <div className="text-center">
        {/* Animated logo container */}
        <div className="relative mb-6">
          <div className="w-20 h-20 mx-auto relative">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 border-2 border-slate-700/50 rounded-full"></div>
            <div className="absolute inset-0 border-2 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
            
            {/* Inner logo */}
            <div className="absolute inset-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 relative">
                {/* Code brackets */}
                <span className="absolute inset-0 text-white font-bold text-lg flex items-center justify-center animate-pulse">
                  &lt;/&gt;
                </span>
              </div>
            </div>
            
            {/* Pulsing outer glow */}
            <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full animate-ping"></div>
          </div>
        </div>
        
        {/* Brand name with blinker */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          Synergy Solver
          <span className="animate-blink text-blue-500 ml-1">|</span>
        </h1>
      </div>

      {/* Custom CSS for blinker */}
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;