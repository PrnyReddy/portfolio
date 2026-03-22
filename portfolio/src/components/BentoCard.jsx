import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const BentoCard = ({ children, className = '', colSpan = 1, rowSpan = 1, delay = 0 }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
        position: 'relative',
        borderRadius: '24px',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
      }}
      className={`glass-panel ${className}`}
      whileHover={{ scale: 0.98, borderColor: 'var(--border-hover)' }}
    >
      {/* Magnetic Glow Effect */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          top: mousePosition.y - 300,
          left: mousePosition.x - 300,
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      
      {/* Content Container */}
      <div style={{ position: 'relative', zIndex: 1, height: '100%', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </motion.div>
  );
};
