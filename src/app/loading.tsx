'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center">
      <div className="relative w-16 h-16">
        {/* Outer rotating circle */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-600 border-r-cyan-600 animate-spin" />
        
        {/* Middle rotating circle */}
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-purple-600 border-l-cyan-600 animate-spin-reverse" />
        
        {/* Inner static circle */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600" />
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}
