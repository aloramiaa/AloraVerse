import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        // Calculate new progress
        const newProgress = prevProgress + Math.random() * 15;
        
        // If we're close to 100%, slow down to give assets time to load
        if (newProgress > 85) {
          return Math.min(prevProgress + 1, 99);
        }
        
        return Math.min(newProgress, 99);
      });
    }, 200);
    
    // Start tracking actual page load
    const handleLoad = () => {
      clearInterval(interval);
      setProgress(100);
      
      // Delay hiding the loading screen for a smoother transition
      setTimeout(() => {
        setIsVisible(false);
        // Notify parent that loading is complete after fade animation
        setTimeout(() => {
          if (onLoadingComplete) onLoadingComplete();
        }, 500);
      }, 800);
    };
    
    // Track when all assets are loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('load', handleLoad);
    };
  }, [onLoadingComplete]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
      style={{
        opacity: progress === 100 ? 0 : 1,
        transition: 'opacity 0.5s ease-in-out',
      }}
    >
      <div className="w-full max-w-md px-6 flex flex-col items-center">
        {/* Logo or site title */}
        <div className="mb-10 text-4xl font-bold text-white animate-pulse">
          AloraVerse
        </div>
        
        {/* Progress container */}
        <div className="w-full h-1 bg-black-200 rounded-full overflow-hidden mb-2 relative">
          {/* Progress bar with gradient */}
          <div 
            className="h-full rounded-full bg-gradient-to-r from-purple-700 via-purple-400 to-accent"
            style={{ 
              width: `${progress}%`,
              transition: 'width 0.3s ease-out',
            }}
          />
          
          {/* Shimmer effect overlay */}
          <div className="absolute inset-0 shimmer-effect"></div>
        </div>
        
        {/* Progress text */}
        <div className="text-white-50 text-sm mt-2">
          {Math.round(progress)}% Loaded
        </div>
        
        {/* Loading message */}
        <div className="mt-8 text-blue-50 text-center">
          <p className="animate-pulse">Preparing some magic for you...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 