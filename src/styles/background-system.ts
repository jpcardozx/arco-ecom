/**
 * S-Tier Background System Extension
 * Sophisticated glassmorphism backgrounds matching hero-level complexity
 */

export const complexBackgroundStyles = {
  // Premium section backgrounds with multi-layer depth
  premiumSection: `
    background: 
      radial-gradient(circle at 20% 80%, rgba(30, 64, 175, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
      linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%);
  `,
  
  // Technical credibility background for methodology sections
  technicalSection: `
    background:
      radial-gradient(circle at 15% 90%, rgba(59, 130, 246, 0.08) 0%, transparent 40%),
      radial-gradient(circle at 85% 10%, rgba(16, 185, 129, 0.06) 0%, transparent 40%),
      linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.92) 100%);
  `,
  
  // Partnership positioning background for collaboration sections
  partnershipSection: `
    background:
      radial-gradient(circle at 30% 70%, rgba(147, 51, 234, 0.08) 0%, transparent 45%),
      radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.06) 0%, transparent 45%),
      linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(30, 41, 59, 0.94) 100%);
  `,
  
  // Value demonstration background with proof emphasis
  valueSection: `
    background:
      radial-gradient(circle at 25% 75%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 25%, rgba(245, 158, 11, 0.05) 0%, transparent 40%),
      linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(30, 41, 59, 0.96) 100%);
  `
};

export const backgroundOverlays = {
  // Architectural grid pattern for technical sections
  architecturalGrid: `
    position: absolute;
    inset: 0;
    background: 
      linear-gradient(45deg, transparent 49%, rgba(255, 255, 255, 0.01) 50%, transparent 51%),
      linear-gradient(-45deg, transparent 49%, rgba(255, 255, 255, 0.01) 50%, transparent 51%);
    background-size: 60px 60px;
    opacity: 0.5;
  `,
  
  // Symbolic overlay for premium sections
  symbolicOverlay: `
    position: absolute;
    inset: 0;
    background: url('/symbolic-overlay.png') repeat;
    opacity: 0.03;
    filter: blur(0.5px);
  `,
  
  // Interactive particle system base
  particleSystemBase: `
    position: absolute;
    inset: 0;
    background: radial-gradient(2px 2px at 20px 30px, rgba(59, 130, 246, 0.3), transparent),
                radial-gradient(2px 2px at 40px 70px, rgba(147, 51, 234, 0.2), transparent),
                radial-gradient(1px 1px at 90px 40px, rgba(16, 185, 129, 0.3), transparent);
    background-size: 100px 100px;
    animation: particleFloat 20s linear infinite;
  `
};

export const backgroundAnimations = `
  @keyframes particleFloat {
    0% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -30px) rotate(120deg); }
    66% { transform: translate(-20px, 20px) rotate(240deg); }
    100% { transform: translate(0, 0) rotate(360deg); }
  }
  
  @keyframes subtleGlow {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 0.8; }
  }
  
  @keyframes depthShift {
    0%, 100% { transform: translateZ(0) scale(1); }
    50% { transform: translateZ(10px) scale(1.02); }
  }
`;

// CSS-in-JS compatible styles for React components
export const reactBackgroundStyles = {
  premiumSection: {
    background: `
      radial-gradient(circle at 20% 80%, rgba(30, 64, 175, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
      linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)
    `
  },
  
  technicalSection: {
    background: `
      radial-gradient(circle at 15% 90%, rgba(59, 130, 246, 0.08) 0%, transparent 40%),
      radial-gradient(circle at 85% 10%, rgba(16, 185, 129, 0.06) 0%, transparent 40%),
      linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.92) 100%)
    `
  },
  
  partnershipSection: {
    background: `
      radial-gradient(circle at 30% 70%, rgba(147, 51, 234, 0.08) 0%, transparent 45%),
      radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.06) 0%, transparent 45%),
      linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(30, 41, 59, 0.94) 100%)
    `
  }
};
