import React, { useState, useEffect } from 'react';
import HeartShower from './HeartShower';
import StarryBackground from './StarryBackground';

const VisualEffects = () => {
  const [effects, setEffects] = useState({
    hearts: true,
    stars: true
  });
  
  // Check for saved preferences
  useEffect(() => {
    const savedEffects = localStorage.getItem('visualEffects');
    if (savedEffects) {
      try {
        setEffects(JSON.parse(savedEffects));
      } catch (e) {
        console.error("Error parsing saved visual effects:", e);
      }
    }
  }, []);
  
  // Save preferences when changed
  useEffect(() => {
    localStorage.setItem('visualEffects', JSON.stringify(effects));
  }, [effects]);
  
  const toggleEffect = (effect) => {
    setEffects(prev => ({
      ...prev,
      [effect]: !prev[effect]
    }));
  };
  
  return (
    <>
      {effects.hearts && (
        <HeartShower 
          density={12} 
          colors={['#ff5e5e', '#ff9d9d', '#6d45ce', '#9c45ce', '#ce45b9']} 
        />
      )}
      
      {effects.stars && (
        <StarryBackground 
          starCount={150} 
          starColor="#ffffff" 
          speed={0.15} 
        />
      )}
      
      {/* Effects control panel */}
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={() => document.getElementById('effects-panel').classList.toggle('hidden')}
          className="bg-black-200 p-2 rounded-full shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white-50">
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.7071-.7071M6.34315 6.34315l-.70711-.70711m12.72796.00005-.7071.70711M6.3432 17.6569l-.70711.7071M16 12c0 2.2091-1.7909 4-4 4-2.20914 0-4-1.7909-4-4 0-2.20914 1.79086-4 4-4 2.2091 0 4 1.79086 4 4z"></path>
          </svg>
        </button>
        
        <div id="effects-panel" className="hidden bg-black-200 mt-2 p-4 rounded-lg shadow-lg">
          <h4 className="text-white-50 font-medium mb-2">Visual Effects</h4>
          
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-white-50">
              <input 
                type="checkbox" 
                checked={effects.hearts} 
                onChange={() => toggleEffect('hearts')}
                className="accent-accent"
              />
              Hearts
            </label>
            
            <label className="flex items-center gap-2 text-white-50">
              <input 
                type="checkbox" 
                checked={effects.stars} 
                onChange={() => toggleEffect('stars')}
                className="accent-accent"
              />
              Stars
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisualEffects;