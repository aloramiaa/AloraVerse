import React, { useEffect, useRef } from 'react';

const StarryBackground = ({ starCount = 200, starColor = '#ffffff', speed = 0.2 }) => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  
  // Initialize stars
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;
    
    // Handle resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Create new stars when resized
      initStars();
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Initialize stars
    function initStars() {
      starsRef.current = [];
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.5,
          vx: Math.floor(Math.random() * 50) - 25,
          vy: Math.floor(Math.random() * 50) - 25,
          alpha: Math.random(),
          increasing: true
        });
      }
    }
    
    // Animation function
    function animate() {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      
      for (let i = 0; i < starsRef.current.length; i++) {
        const s = starsRef.current[i];
        
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${parseInt(starColor.slice(1, 3), 16)}, ${parseInt(starColor.slice(3, 5), 16)}, ${parseInt(starColor.slice(5, 7), 16)}, ${s.alpha})`;
        ctx.fill();
        
        // Update position based on tiny vector movement
        s.x += s.vx / 100 * speed;
        s.y += s.vy / 100 * speed;
        
        // Twinkle effect
        if (s.increasing) {
          s.alpha += 0.003;
          if (s.alpha >= 0.7) s.increasing = false;
        } else {
          s.alpha -= 0.003;
          if (s.alpha <= 0.1) s.increasing = true;
        }
        
        // Handle edges - wrap around
        if (s.x < -50) s.x = width + 50;
        if (s.y < -50) s.y = height + 50;
        if (s.x > width + 50) s.x = -50;
        if (s.y > height + 50) s.y = -50;
      }
      
      animationFrameId = window.requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [starCount, starColor, speed]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default StarryBackground; 