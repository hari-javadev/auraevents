import React from 'react';
import { motion } from 'framer-motion';

// Realistic SVG Butterfly with separate 3D fluttering wings
function ButterflySVG({ id, className = "w-full h-full" }) {
  return (
    <svg
      viewBox="0 0 100 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: 'drop-shadow(0 0 6px rgba(216, 180, 106, 0.65)) drop-shadow(0 0 14px rgba(216, 180, 106, 0.3))' }}
    >
      <defs>
        {/* Shimmering champagne-gold linear gradient for upper wings */}
        <linearGradient id={`gold-wing-upper-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF4D0" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#EECB76" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#D8B46A" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#8A6B29" stopOpacity="0.8" />
        </linearGradient>

        {/* Deeper gold gradient for lower wings */}
        <linearGradient id={`gold-wing-lower-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5DC9A" stopOpacity="0.88" />
          <stop offset="50%" stopColor="#D8B46A" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#7D5F22" stopOpacity="0.75" />
        </linearGradient>

        {/* Delicate golden wing vein pattern */}
        <linearGradient id={`gold-vein-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF9E6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#EECB76" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Left Wing with Realistic Flap Animation */}
      <g
        className="butterfly-wing-left"
        style={{
          transformOrigin: '50px 42px',
          animation: `wing-flap-left 0.42s ease-in-out infinite alternate`,
        }}
      >
        {/* Left Forewing (Upper Wing) */}
        <path
          d="M 50,40 C 44,24 28,6 12,12 C 2,16 -1,32 12,45 C 24,55 44,45 50,40 Z"
          fill={`url(#gold-wing-upper-${id})`}
        />
        {/* Delicate veins inside left forewing */}
        <path
          d="M 48,38 C 34,26 22,18 13,15 M 46,39 C 30,32 16,30 6,26 M 46,42 C 32,45 20,45 14,44"
          stroke={`url(#gold-vein-${id})`}
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        {/* Left Hindwing (Lower Wing) */}
        <path
          d="M 48,43 C 40,54 22,68 15,58 C 10,50 20,44 48,43 Z"
          fill={`url(#gold-wing-lower-${id})`}
        />
        <path
          d="M 45,44 C 32,54 22,58 16,56"
          stroke={`url(#gold-vein-${id})`}
          strokeWidth="0.7"
          strokeLinecap="round"
        />
      </g>

      {/* Right Wing with Realistic Flap Animation */}
      <g
        className="butterfly-wing-right"
        style={{
          transformOrigin: '50px 42px',
          animation: `wing-flap-right 0.42s ease-in-out infinite alternate`,
        }}
      >
        {/* Right Forewing (Upper Wing) */}
        <path
          d="M 50,40 C 56,24 72,6 88,12 C 98,16 101,32 88,45 C 76,55 56,45 50,40 Z"
          fill={`url(#gold-wing-upper-${id})`}
        />
        {/* Delicate veins inside right forewing */}
        <path
          d="M 52,38 C 66,26 78,18 87,15 M 54,39 C 70,32 84,30 94,26 M 54,42 C 68,45 80,45 86,44"
          stroke={`url(#gold-vein-${id})`}
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        {/* Right Hindwing (Lower Wing) */}
        <path
          d="M 52,43 C 60,54 78,68 85,58 C 90,50 80,44 52,43 Z"
          fill={`url(#gold-wing-lower-${id})`}
        />
        <path
          d="M 55,44 C 68,54 78,58 84,56"
          stroke={`url(#gold-vein-${id})`}
          strokeWidth="0.7"
          strokeLinecap="round"
        />
      </g>

      {/* Butterfly Body & Head */}
      <path
        d="M 49,26 Q 50,24 51,26 L 51,54 Q 50,56 49,54 Z"
        fill="#5A4318"
      />
      <circle cx="50" cy="24" r="2.2" fill="#D8B46A" />

      {/* Antennae */}
      <path
        d="M 49.5,23 Q 44,16 38,15 M 50.5,23 Q 56,16 62,15"
        stroke="#EECB76"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function GoldenButterflies() {
  // 5 elegant butterflies with varied scales, initial positions, and natural flight paths
  const butterflies = [
    {
      id: 1,
      size: 32, // Large foreground butterfly
      opacity: 0.85,
      flapSpeed: '0.36s',
      initial: { x: '8vw', y: '65vh', rotate: 18, scale: 0.95 },
      animate: {
        x: ['8vw', '22vw', '38vw', '52vw', '36vw', '18vw', '8vw'],
        y: ['65vh', '48vh', '32vh', '42vh', '58vh', '68vh', '65vh'],
        rotate: [18, 28, 12, -15, -28, 5, 18],
        scale: [0.95, 1.05, 1.0, 0.92, 1.02, 0.96, 0.95],
      },
      transition: {
        duration: 22,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    {
      id: 2,
      size: 26, // Medium midground butterfly
      opacity: 0.78,
      flapSpeed: '0.40s',
      initial: { x: '78vw', y: '28vh', rotate: -20, scale: 0.88 },
      animate: {
        x: ['78vw', '64vw', '72vw', '86vw', '78vw'],
        y: ['28vh', '38vh', '52vh', '36vh', '28vh'],
        rotate: [-20, -32, 10, -8, -20],
        scale: [0.88, 0.94, 0.85, 0.92, 0.88],
      },
      transition: {
        duration: 18,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 1.5,
      },
    },
    {
      id: 3,
      size: 19, // Delicate small background butterfly with softer glow
      opacity: 0.6,
      flapSpeed: '0.32s',
      initial: { x: '25vw', y: '20vh', rotate: 25, scale: 0.75 },
      animate: {
        x: ['25vw', '34vw', '48vw', '32vw', '20vw', '25vw'],
        y: ['20vh', '15vh', '22vh', '28vh', '24vh', '20vh'],
        rotate: [25, 10, -18, -30, 15, 25],
        scale: [0.75, 0.8, 0.72, 0.78, 0.74, 0.75],
      },
      transition: {
        duration: 16,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 3,
      },
    },
    {
      id: 4,
      size: 28, // Lower-right floating butterfly
      opacity: 0.82,
      flapSpeed: '0.44s',
      initial: { x: '65vw', y: '72vh', rotate: -15, scale: 0.9 },
      animate: {
        x: ['65vw', '50vw', '62vw', '75vw', '65vw'],
        y: ['72vh', '58vh', '48vh', '62vh', '72vh'],
        rotate: [-15, -28, 12, 22, -15],
        scale: [0.9, 0.98, 0.88, 0.94, 0.9],
      },
      transition: {
        duration: 24,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 2,
      },
    },
    {
      id: 5,
      size: 22, // Floating accent on far left
      opacity: 0.7,
      flapSpeed: '0.38s',
      initial: { x: '4vw', y: '35vh', rotate: 12, scale: 0.82 },
      animate: {
        x: ['4vw', '14vw', '8vw', '2vw', '4vw'],
        y: ['35vh', '24vh', '18vh', '30vh', '35vh'],
        rotate: [12, 24, -10, 5, 12],
        scale: [0.82, 0.88, 0.8, 0.85, 0.82],
      },
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 4.5,
      },
    },
  ];

  return (
    <>
      {/* Dynamic 3D Wing Flap Keyframes Injected for Maximum Performance */}
      <style>{`
        @keyframes wing-flap-left {
          0% {
            transform: scaleX(1);
          }
          100% {
            transform: scaleX(0.2);
          }
        }
        @keyframes wing-flap-right {
          0% {
            transform: scaleX(1);
          }
          100% {
            transform: scaleX(0.2);
          }
        }
      `}</style>

      {/* Butterflies Layer: Positioned behind hero text & logo (z-[5]), pointer-events-none, strictly confined to Hero */}
      <div
        className="absolute inset-0 z-[5] overflow-hidden pointer-events-none motion-reduce:hidden"
        aria-hidden="true"
      >
        {butterflies.map((b) => (
          <motion.div
            key={b.id}
            initial={b.initial}
            animate={b.animate}
            transition={b.transition}
            className="absolute top-0 left-0 will-change-transform"
            style={{
              width: `${b.size}px`,
              height: `${(b.size * 82) / 100}px`,
              opacity: b.opacity,
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              <ButterflySVG id={b.id} />
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
