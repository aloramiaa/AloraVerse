import React from 'react';

const GlowEffect = ({ 
  children, 
  color = '#6d45ce', 
  intensity = 20, 
  className = '', 
  radius = 50 
}) => {
  // Convert hex to rgba for glow
  const getRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div 
      className={`relative ${className}`}
      style={{
        filter: `drop-shadow(0 0 ${intensity}px ${getRgba(color, 0.5)})`
      }}
    >
      {/* Subtle glow overlay */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${getRgba(color, 0.15)} 0%, transparent ${radius}%)`,
          transform: 'translateZ(0)'
        }}
      />
      
      {/* Actual content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlowEffect; 