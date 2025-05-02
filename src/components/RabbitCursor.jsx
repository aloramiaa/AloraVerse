import React, { useState, useEffect, useRef } from 'react';

// Rabbit animation frames
const rabbitFrames = [
  '/cursors/rabbit1.svg',
  '/cursors/rabbit2.svg',
  '/cursors/rabbit3.svg',
  '/cursors/rabbit4.svg',
];

// Sparkle colors
const sparkleColors = ['#ffcf8c', '#fff4c7', '#ffec9e', '#ffecb3', '#fffbeb'];

// Sparkle shapes
const sparkleShapes = [
  '★', '✦', '✧', '✩', '✫', '✬', '✭', '✮', '✯', '✰', '⋆', '･', '⁺', '✺', '✹'
];

const RabbitCursor = ({ size = 40, speed = 0.15 }) => {
  // State for rabbit and effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rabbitRef = useRef({ x: 0, y: 0 });
  const [rabbitPosition, setRabbitPosition] = useState({ x: 0, y: 0 });
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [flipX, setFlipX] = useState(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState([]);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  
  // Track mouse position
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    // Initialize rabbit position once we have mouse position
    const initRabbit = () => {
      if (mousePosition.x && mousePosition.y) {
        rabbitRef.current = { x: mousePosition.x, y: mousePosition.y };
        setRabbitPosition({ x: mousePosition.x, y: mousePosition.y });
        prevMousePosRef.current = { x: mousePosition.x, y: mousePosition.y };
      }
    };
    
    initRabbit();
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  
  // Update rabbit position with smooth animation
  useEffect(() => {
    if (!mousePosition.x && !mousePosition.y) return;
    
    // Check if mouse has moved
    const hasMouseMoved = 
      prevMousePosRef.current.x !== mousePosition.x || 
      prevMousePosRef.current.y !== mousePosition.y;
    
    // Determine direction of movement for flipping the rabbit
    if (hasMouseMoved && mousePosition.x !== prevMousePosRef.current.x) {
      setFlipX(mousePosition.x < prevMousePosRef.current.x);
    }
    
    // Update animation state
    if (hasMouseMoved) {
      setIsMoving(true);
      
      // Add sparkles when moving (less frequent)
      if (isMoving && Math.random() > 0.85) {
        addSparkle(rabbitPosition.x, rabbitPosition.y);
      }
      
      // Reset the timeout on each mouse move
      clearTimeout(window.rabbitTimeout);
      window.rabbitTimeout = setTimeout(() => {
        setIsMoving(false);
      }, 100);
    }
    
    // Store current mouse position
    prevMousePosRef.current = { x: mousePosition.x, y: mousePosition.y };
    
    // Animate rabbit movement
    const animateRabbit = () => {
      // Calculate distance to target
      const dx = mousePosition.x - rabbitRef.current.x;
      const dy = mousePosition.y - rabbitRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Stop animation if rabbit is close enough to target
      if (distance < 0.1) {
        return;
      }
      
      // Update rabbit position with easing
      rabbitRef.current = {
        x: rabbitRef.current.x + dx * speed,
        y: rabbitRef.current.y + dy * speed
      };
      
      setRabbitPosition(rabbitRef.current);
      requestAnimationFrame(animateRabbit);
    };
    
    requestAnimationFrame(animateRabbit);
  }, [mousePosition, speed, isMoving, rabbitPosition]);
  
  // Add a sparkle at the given position
  const addSparkle = (x, y) => {
    const newSparkle = {
      id: Date.now() + Math.random(),
      x: x + (Math.random() * 20 - 10), // Random offset
      y: y + (Math.random() * 20 - 10), // Random offset
      size: Math.random() * 8 + 4, // Size between 4-12px
      color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
      shape: Math.random() > 0.5 ? null : sparkleShapes[Math.floor(Math.random() * sparkleShapes.length)],
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.8,
    };
    
    setSparkles(prev => [...prev, newSparkle]);
    
    // Remove sparkle after animation duration
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
    }, 800); // Match animation duration
  };
  
  // Cycle through animation frames when rabbit is moving
  useEffect(() => {
    if (!isMoving) return;
    
    const frameInterval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % rabbitFrames.length);
    }, 80); // Change frame every 80ms for running animation
    
    return () => clearInterval(frameInterval);
  }, [isMoving]);
  
  // Add listeners for interactive elements
  useEffect(() => {
    const handleButtonHover = (e) => {
      // Add sparkles around buttons when hovered
      if (e.type === 'mouseenter') {
        setIsButtonHovered(true);
        // Add multiple sparkles around the cursor
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            if (rabbitPosition.x && rabbitPosition.y) {
              addSparkle(rabbitPosition.x, rabbitPosition.y);
            }
          }, i * 50);
        }
      } else {
        setIsButtonHovered(false);
      }
    };
    
    // Add rabbit-hover class to clickable elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .clickable');
    interactiveElements.forEach(el => {
      el.classList.add('rabbit-hover');
      el.addEventListener('mouseenter', handleButtonHover);
      el.addEventListener('mouseleave', handleButtonHover);
    });
    
    return () => {
      interactiveElements.forEach(el => {
        el.classList.remove('rabbit-hover');
        el.removeEventListener('mouseenter', handleButtonHover);
        el.removeEventListener('mouseleave', handleButtonHover);
      });
    };
  }, [rabbitPosition]);
  
  // Hide the default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    
    // Add cursor styles to interactive elements
    const style = document.createElement('style');
    style.innerHTML = `
      a, button, [role="button"], input, select, textarea, label[for], .clickable {
        cursor: none !important;
      }
      
      /* Add hover state styles for interactive elements */
      a:hover, button:hover, [role="button"]:hover, .clickable:hover {
        filter: brightness(1.1);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <>
      {/* Sparkles */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="fixed pointer-events-none z-[9998] rabbit-sparkle"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            color: sparkle.color,
            fontSize: `${sparkle.size}px`,
            opacity: 1,
            transform: `translate(-50%, -50%) rotate(${sparkle.rotation}deg) scale(${sparkle.scale})`,
          }}
        >
          {sparkle.shape ? (
            // Text sparkle
            <span className="block">
              {sparkle.shape}
            </span>
          ) : (
            // Circle sparkle
            <div
              style={{
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
                background: sparkle.color,
                borderRadius: '50%',
                boxShadow: `0 0 ${sparkle.size / 2}px ${sparkle.color}`,
              }}
            />
          )}
        </div>
      ))}
      
      {/* Rabbit cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-transform ${isButtonHovered ? 'scale-110' : ''}`}
        style={{
          left: `${rabbitPosition.x}px`,
          top: `${rabbitPosition.y}px`,
          width: `${size}px`,
          height: `${size}px`,
          transform: `translate(-50%, -60%) ${flipX ? 'scaleX(-1)' : ''}`,
          filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))',
        }}
      >
        <img
          src={isMoving ? rabbitFrames[currentFrame] : rabbitFrames[0]}
          alt="Rabbit cursor"
          className="w-full h-full object-contain"
        />
      </div>
    </>
  );
};

export default RabbitCursor; 