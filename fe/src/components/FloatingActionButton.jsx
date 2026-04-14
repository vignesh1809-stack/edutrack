import React from 'react';

const FloatingActionButton = () => {
  return (
    <button className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-primary to-primary-dim text-white rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center active:scale-95 transition-transform">
      <span className="material-symbols-outlined text-3xl">add</span>
    </button>
  );
};

export default FloatingActionButton;
