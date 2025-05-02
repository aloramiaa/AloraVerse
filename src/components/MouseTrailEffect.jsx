import React, { useEffect, useState } from 'react';

const MouseTrailEffect = ({ 
  particleCount = 15, 
  particleSize = 8, 
  particleColor = '#6d45ce', 
  decay = 0.95 
}) => {
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  
  useEffect(() => {
    // Initialize empty particles
    const initialParticles = Array(particleCount).fill().map((_, i) => ({
      id: i,
      x: 0,
      y: 0,
      size: particleSize * (1 - (i / particleCount)), // Progressively smaller
      alpha: 1 - (i / particleCount) // Progressively more transparent
    }));
    
    setParticles(initialParticles);
    
    // Mouse move handler
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsMouseMoving(true);
      
      // Reset the timeout on each mouse move
      clearTimeout(window.mouseTimeout);
      window.mouseTimeout = setTimeout(() => {
        setIsMouseMoving(false);
      }, 100);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(window.mouseTimeout);
    };
  }, [particleCount, particleSize]);
  
  useEffect(() => {
    if (!isMouseMoving) return;
    
    const interval = setInterval(() => {
      setParticles(prevParticles => {
        const newParticles = [...prevParticles];
        
        // Update the first particle to the mouse position
        if (newParticles.length > 0) {
          newParticles[0] = {
            ...newParticles[0],
            x: mousePos.x,
            y: mousePos.y
          };
        }
        
        // Each following particle moves toward the position of the previous particle
        for (let i = 1; i < newParticles.length; i++) {
          const prev = newParticles[i - 1];
          newParticles[i] = {
            ...newParticles[i],
            x: newParticles[i].x + (prev.x - newParticles[i].x) * decay,
            y: newParticles[i].y + (prev.y - newParticles[i].y) * decay
          };
        }
        
        return newParticles;
      });
    }, 16); // ~60fps
    
    return () => clearInterval(interval);
  }, [mousePos, isMouseMoving, decay]);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            backgroundColor: particleColor,
            opacity: particle.alpha,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${particle.size * 2}px ${particleColor}`,
            transition: 'opacity 0.2s ease'
          }}
        />
      ))}
    </div>
  );
};

export default MouseTrailEffect; 