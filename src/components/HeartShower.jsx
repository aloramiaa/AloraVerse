import React, { useEffect, useState } from 'react';

const HeartShower = ({ density = 15, colors = ['#ff5e5e', '#ff9d9d', '#ffb3b3', '#ff7979', '#ff3838'] }) => {
  const [hearts, setHearts] = useState([]);
  
  useEffect(() => {
    // Create initial hearts
    generateHearts();
    
    // Set interval to continuously add new hearts
    const interval = setInterval(() => {
      addHeart();
    }, 800);
    
    return () => clearInterval(interval);
  }, []);
  
  const generateHearts = () => {
    const initialHearts = [];
    for (let i = 0; i < density; i++) {
      initialHearts.push(createHeart());
    }
    setHearts(initialHearts);
  };
  
  const addHeart = () => {
    setHearts(prevHearts => {
      // Remove oldest heart if we have too many (to avoid performance issues)
      const newHearts = [...prevHearts];
      if (newHearts.length > 50) {
        newHearts.shift();
      }
      return [...newHearts, createHeart()];
    });
  };
  
  const createHeart = () => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 100, // position horizontally (0-100%)
      size: Math.random() * 20 + 10, // size between 10-30px
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 15 + 10, // animation duration between 10-25s
      delay: Math.random() * 5, // delay start of animation
      opacity: Math.random() * 0.5 + 0.3, // opacity between 0.3-0.8
    };
  };
  
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[1] overflow-hidden">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute animate-float"
          style={{
            left: `${heart.x}%`,
            bottom: '-50px',
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            opacity: heart.opacity,
            animation: `float ${heart.duration}s linear ${heart.delay}s infinite`,
            color: heart.color,
          }}
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="w-full h-full animate-pulse"
            style={{
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      ))}
    </div>
  );
};

export default HeartShower; 