import { useState, useEffect } from 'react';

const LoadingBar = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [particles, setParticles] = useState([]);

  // Generate random particles
  useEffect(() => {
    const particleCount = 30;
    const newParticles = Array.from({ length: particleCount }).map(() => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 2,
      speed: Math.random() * 2 + 1,
      color: `hsl(${Math.random() * 60 + 240}, 100%, 70%)`,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 8;
        
        // When we reach 100%, clear interval and trigger completion
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Set to exactly 100% for visual accuracy
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => {
              if (onLoadComplete) onLoadComplete();
            }, 800); // Slight delay after reaching 100% before page reveal
          }, 600);
          
          return 100;
        }
        
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-700 ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{
        background: 'radial-gradient(circle at center, #1a1f35 0%, #0c1019 100%)',
        overflow: 'hidden',
        perspective: '1000px'
      }}
    >
      {/* Laser beam effect */}
      <div className="absolute w-full h-[1px] top-1/2 bg-cyan-500/30" style={{ boxShadow: '0 0 20px 5px #06b6d4', animation: 'laserScan 8s infinite linear' }}></div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 z-0" style={{ 
        backgroundImage: 'linear-gradient(rgba(66, 153, 225, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(66, 153, 225, 0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        perspective: '500px',
        transform: 'rotateX(60deg) scale(1.5)',
        transformOrigin: 'center',
        animation: 'gridMove 20s infinite linear'
      }}></div>
      
      {/* Background particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            animation: `pulse ${particle.speed}s infinite alternate-reverse ease-in-out`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      <div className="relative w-full max-w-md flex flex-col items-center z-10 transform hover:scale-105 transition-transform duration-300">
        {/* Logo/icon with 3D effect */}
        <div className="mb-8 relative">
          <div 
            className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
            style={{ 
              animation: 'pulse 2s infinite alternate ease-in-out',
              filter: 'drop-shadow(0 0 8px rgba(167, 139, 250, 0.4))',
              textShadow: '0 10px 20px rgba(0,0,0,0.25)'
            }}
          >
            ALORA
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-70"></div>
        </div>
        
        {/* Progress wrapper with 3D effect */}
        <div className="w-full px-4 transform hover:rotate-1 transition-transform duration-300">
          <div className="relative w-full h-4 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/50" style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5), 0 0 15px rgba(79, 70, 229, 0.3)' }}>
            {/* Animated progress bar */}
            <div 
              className="absolute top-0 h-full rounded-full"
              style={{ 
                width: `${progress}%`, 
                background: 'linear-gradient(90deg, #4f46e5 0%, #ec4899 50%, #06b6d4 100%)',
                boxShadow: '0 0 15px rgba(236, 72, 153, 0.8), 0 0 30px rgba(79, 70, 229, 0.4)',
                transition: 'width 0.3s ease-out'
              }}
            />
            
            {/* Animated shine effect */}
            <div
              className="absolute top-0 h-full w-20 bg-white/20"
              style={{
                left: `${progress - 20}%`,
                filter: 'blur(8px)',
                transform: 'skewX(-15deg)',
                transition: 'left 0.3s ease-out'
              }}
            />
            
            {/* Progress orb */}
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-white" 
              style={{
                left: `${progress}%`,
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(236, 72, 153, 0.8)',
                transition: 'left 0.3s ease-out',
                opacity: progress < 5 ? 0 : 1
              }}
            />
          </div>
        </div>
        
        {/* Loading text with gradient effect */}
        <div className="mt-6 text-white/90 font-medium flex items-center">
          <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 text-transparent bg-clip-text font-semibold">
            Loading AloraVerse...
          </span>
          <span className="ml-2 w-14 text-right text-teal-300 font-bold text-shadow">
            {Math.round(progress)}%
          </span>
        </div>
        
        {/* Loading dots animation */}
        <div className="flex mt-2 space-x-1">
          {[0, 1, 2].map(i => (
            <div 
              key={i} 
              className="w-2 h-2 rounded-full bg-indigo-400"
              style={{ 
                animation: 'bounce 1.4s infinite ease-in-out',
                animationDelay: `${i * 0.2}s`,
                boxShadow: '0 0 5px rgba(99, 102, 241, 0.8)'
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS animations for loading bar */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0% { opacity: 0.3; transform: scale(0.8); }
          100% { opacity: 0.8; transform: scale(1.2); }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes laserScan {
          0% { transform: translateY(-30vh) rotate(-10deg); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(30vh) rotate(10deg); opacity: 0; }
        }
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        .text-shadow {
          text-shadow: 0 0 10px rgba(45, 212, 191, 0.7);
        }
      `}} />
    </div>
  );
};

export default LoadingBar; 