'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
}

interface ShootingStar {
  startX: number;
  startY: number;
  length: number;
  angle: number;
  speed: number;
}

interface ConstellationPoint {
  x: number;
  y: number;
  brightness: number; // 0-1, some stars are brighter
}

interface ZodiacConstellation {
  points: ConstellationPoint[];
  connections: [number, number][];
  centerX: number;
  centerY: number;
  scale: number;
  opacity: number;
}

// Les 12 constellations du zodiaque avec leurs formes réalistes
const createZodiacConstellations = (): ZodiacConstellation[] => [
  // Bélier (Aries)
  {
    points: [
      { x: 0, y: 0, brightness: 1 },
      { x: 0.03, y: 0.02, brightness: 0.8 },
      { x: 0.05, y: 0.01, brightness: 0.6 },
      { x: 0.07, y: 0.03, brightness: 0.5 },
    ],
    connections: [[0, 1], [1, 2], [2, 3]],
    centerX: 0.06,
    centerY: 0.12,
    scale: 0.8,
    opacity: 1,
  },
  // Taureau (Taurus)
  {
    points: [
      { x: 0, y: 0, brightness: 1 },
      { x: -0.02, y: -0.02, brightness: 0.7 },
      { x: -0.04, y: -0.01, brightness: 0.6 },
      { x: 0.03, y: -0.02, brightness: 0.8 },
      { x: 0.06, y: -0.04, brightness: 0.7 },
      { x: 0.04, y: 0.02, brightness: 0.6 },
      { x: 0.07, y: 0.03, brightness: 0.5 },
    ],
    connections: [[0, 1], [1, 2], [0, 3], [3, 4], [0, 5], [5, 6]],
    centerX: 0.2,
    centerY: 0.08,
    scale: 0.9,
    opacity: 1,
  },
  // Gémeaux (Gemini)
  {
    points: [
      { x: 0, y: 0, brightness: 1 },
      { x: 0.02, y: 0.03, brightness: 0.7 },
      { x: 0.01, y: 0.06, brightness: 0.6 },
      { x: 0, y: 0.09, brightness: 0.5 },
      { x: 0.04, y: 0, brightness: 1 },
      { x: 0.05, y: 0.03, brightness: 0.7 },
      { x: 0.045, y: 0.06, brightness: 0.6 },
      { x: 0.04, y: 0.09, brightness: 0.5 },
    ],
    connections: [[0, 1], [1, 2], [2, 3], [4, 5], [5, 6], [6, 7], [0, 4], [3, 7]],
    centerX: 0.35,
    centerY: 0.15,
    scale: 0.85,
    opacity: 1,
  },
  // Cancer
  {
    points: [
      { x: 0, y: 0, brightness: 0.8 },
      { x: 0.02, y: 0.02, brightness: 0.7 },
      { x: 0.04, y: 0.01, brightness: 0.6 },
      { x: 0.03, y: 0.04, brightness: 0.9 },
      { x: 0.05, y: 0.03, brightness: 0.5 },
    ],
    connections: [[0, 1], [1, 2], [1, 3], [3, 4]],
    centerX: 0.5,
    centerY: 0.1,
    scale: 0.75,
    opacity: 1,
  },
  // Lion (Leo)
  {
    points: [
      { x: 0, y: 0, brightness: 1 },
      { x: 0.02, y: -0.02, brightness: 0.8 },
      { x: 0.04, y: -0.03, brightness: 0.7 },
      { x: 0.06, y: -0.02, brightness: 0.6 },
      { x: 0.07, y: 0, brightness: 0.7 },
      { x: 0.05, y: 0.02, brightness: 0.8 },
      { x: 0.03, y: 0.01, brightness: 0.6 },
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]],
    centerX: 0.65,
    centerY: 0.08,
    scale: 1.0,
    opacity: 1,
  },
  // Vierge (Virgo)
  {
    points: [
      { x: 0, y: 0, brightness: 1 },
      { x: 0.02, y: -0.03, brightness: 0.7 },
      { x: 0.04, y: -0.05, brightness: 0.6 },
      { x: 0.06, y: -0.04, brightness: 0.8 },
      { x: 0.08, y: -0.06, brightness: 0.5 },
      { x: 0.03, y: -0.01, brightness: 0.6 },
      { x: 0.05, y: 0.01, brightness: 0.5 },
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [1, 5], [5, 6]],
    centerX: 0.82,
    centerY: 0.12,
    scale: 0.9,
    opacity: 1,
  },
  // Balance (Libra)
  {
    points: [
      { x: 0, y: 0, brightness: 0.9 },
      { x: 0.04, y: 0, brightness: 0.9 },
      { x: 0.02, y: -0.03, brightness: 0.7 },
      { x: 0.02, y: 0.02, brightness: 0.6 },
    ],
    connections: [[0, 2], [2, 1], [0, 3], [3, 1]],
    centerX: 0.92,
    centerY: 0.25,
    scale: 0.8,
    opacity: 1,
  },
  // Scorpion (Scorpio)
  {
    points: [
      { x: 0, y: 0, brightness: 1 },
      { x: -0.02, y: -0.01, brightness: 0.7 },
      { x: -0.04, y: -0.02, brightness: 0.6 },
      { x: 0.02, y: 0.01, brightness: 0.8 },
      { x: 0.04, y: 0.03, brightness: 0.7 },
      { x: 0.05, y: 0.05, brightness: 0.6 },
      { x: 0.04, y: 0.07, brightness: 0.8 },
      { x: 0.03, y: 0.08, brightness: 0.7 },
    ],
    connections: [[0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [5, 6], [6, 7]],
    centerX: 0.08,
    centerY: 0.55,
    scale: 1.0,
    opacity: 1,
  },
  // Sagittaire (Sagittarius)
  {
    points: [
      { x: 0, y: 0, brightness: 0.9 },
      { x: 0.02, y: -0.02, brightness: 0.8 },
      { x: 0.04, y: -0.01, brightness: 0.7 },
      { x: 0.03, y: 0.02, brightness: 0.8 },
      { x: 0.01, y: 0.03, brightness: 0.6 },
      { x: 0.05, y: 0.01, brightness: 0.9 },
      { x: 0.07, y: -0.02, brightness: 0.7 },
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [2, 5], [5, 6]],
    centerX: 0.25,
    centerY: 0.65,
    scale: 0.85,
    opacity: 1,
  },
  // Capricorne (Capricornus)
  {
    points: [
      { x: 0, y: 0, brightness: 0.8 },
      { x: 0.03, y: -0.02, brightness: 0.7 },
      { x: 0.06, y: -0.01, brightness: 0.9 },
      { x: 0.05, y: 0.02, brightness: 0.6 },
      { x: 0.02, y: 0.03, brightness: 0.7 },
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]],
    centerX: 0.45,
    centerY: 0.72,
    scale: 0.8,
    opacity: 1,
  },
  // Verseau (Aquarius)
  {
    points: [
      { x: 0, y: 0, brightness: 0.9 },
      { x: 0.02, y: 0.01, brightness: 0.7 },
      { x: 0.04, y: 0, brightness: 0.8 },
      { x: 0.06, y: 0.02, brightness: 0.6 },
      { x: 0.03, y: 0.04, brightness: 0.7 },
      { x: 0.05, y: 0.05, brightness: 0.5 },
    ],
    connections: [[0, 1], [1, 2], [2, 3], [2, 4], [4, 5]],
    centerX: 0.65,
    centerY: 0.68,
    scale: 0.85,
    opacity: 1,
  },
  // Poissons (Pisces)
  {
    points: [
      { x: 0, y: 0, brightness: 0.8 },
      { x: 0.02, y: 0.01, brightness: 0.6 },
      { x: 0.04, y: 0, brightness: 0.7 },
      { x: 0.06, y: 0.03, brightness: 0.5 },
      { x: 0.08, y: 0.05, brightness: 0.6 },
      { x: 0.1, y: 0.04, brightness: 0.7 },
      { x: 0.12, y: 0.05, brightness: 0.8 },
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
    centerX: 0.85,
    centerY: 0.58,
    scale: 0.75,
    opacity: 1,
  },
];

export function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const constellationsRef = useRef<ZodiacConstellation[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize constellations
    constellationsRef.current = createZodiacConstellations();

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Generate background stars
    const generateStars = () => {
      const rect = canvas.getBoundingClientRect();
      const starCount = Math.floor((rect.width * rect.height) / 2500);
      starsRef.current = [];

      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          size: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.6 + 0.2,
          twinkleSpeed: Math.random() * 3 + 1,
        });
      }
    };

    generateStars();

    // Animate background stars with GSAP
    starsRef.current.forEach((star) => {
      gsap.to(star, {
        opacity: Math.random() * 0.4 + 0.1,
        duration: star.twinkleSpeed,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    // Animate constellation opacity (gentle pulsing)
    constellationsRef.current.forEach((constellation, index) => {
      gsap.to(constellation, {
        opacity: 0.6 + Math.random() * 0.4,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.3,
      });
    });

    // Create shooting stars periodically
    const createShootingStar = () => {
      const rect = canvas.getBoundingClientRect();
      const shootingStar: ShootingStar = {
        startX: Math.random() * rect.width * 0.7,
        startY: Math.random() * rect.height * 0.4,
        length: Math.random() * 120 + 60,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.4,
        speed: 0,
      };

      shootingStarsRef.current.push(shootingStar);

      gsap.to(shootingStar, {
        speed: 1,
        duration: 0.6 + Math.random() * 0.4,
        ease: 'power2.in',
        onComplete: () => {
          const index = shootingStarsRef.current.indexOf(shootingStar);
          if (index > -1) {
            shootingStarsRef.current.splice(index, 1);
          }
        },
      });
    };

    // Random shooting stars
    const shootingStarInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        createShootingStar();
      }
    }, 3000);

    // Draw a single star with glow
    const drawStar = (
      x: number,
      y: number,
      size: number,
      opacity: number,
      color: string = '255, 255, 255'
    ) => {
      // Core star
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${opacity})`;
      ctx.fill();

      // Inner glow
      if (size > 1) {
        ctx.beginPath();
        ctx.arc(x, y, size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${opacity * 0.3})`;
        ctx.fill();
      }

      // Outer glow for bright stars
      if (size > 2) {
        ctx.beginPath();
        ctx.arc(x, y, size * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${opacity * 0.1})`;
        ctx.fill();
      }
    };

    // Draw constellation with symbol
    const drawConstellation = (
      constellation: ZodiacConstellation,
      rect: DOMRect
    ) => {
      const baseX = constellation.centerX * rect.width;
      const baseY = constellation.centerY * rect.height;
      const scale = constellation.scale * Math.min(rect.width, rect.height) * 0.8;
      const opacity = constellation.opacity;

      // Golden color for zodiac constellations
      const goldColor = '201, 162, 39';

      // Draw connection lines
      ctx.strokeStyle = `rgba(${goldColor}, ${opacity * 0.25})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([]);

      constellation.connections.forEach(([from, to]) => {
        const p1 = constellation.points[from];
        const p2 = constellation.points[to];
        const x1 = baseX + p1.x * scale;
        const y1 = baseY + p1.y * scale;
        const x2 = baseX + p2.x * scale;
        const y2 = baseY + p2.y * scale;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      // Draw constellation stars
      constellation.points.forEach((point) => {
        const x = baseX + point.x * scale;
        const y = baseY + point.y * scale;
        const starSize = 2 + point.brightness * 2;

        drawStar(x, y, starSize, opacity * point.brightness, goldColor);
      });
    };

    // Animation loop
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Draw background stars
      starsRef.current.forEach((star) => {
        drawStar(star.x, star.y, star.size, star.opacity);
      });

      // Draw zodiac constellations
      constellationsRef.current.forEach((constellation) => {
        drawConstellation(constellation, rect);
      });

      // Draw shooting stars
      shootingStarsRef.current.forEach((shootingStar) => {
        const progress = shootingStar.speed;
        const tailLength = shootingStar.length * progress;
        const headX =
          shootingStar.startX + Math.cos(shootingStar.angle) * tailLength;
        const headY =
          shootingStar.startY + Math.sin(shootingStar.angle) * tailLength;
        const tailX =
          headX - Math.cos(shootingStar.angle) * Math.min(tailLength, 100);
        const tailY =
          headY - Math.sin(shootingStar.angle) * Math.min(tailLength, 100);

        // Gradient trail
        const gradient = ctx.createLinearGradient(tailX, tailY, headX, headY);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.5)');
        gradient.addColorStop(0.9, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Bright head
        drawStar(headX, headY, 3, 1);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(shootingStarInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // Kill all GSAP animations
      starsRef.current.forEach((star) => {
        gsap.killTweensOf(star);
      });
      constellationsRef.current.forEach((constellation) => {
        gsap.killTweensOf(constellation);
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.95 }}
    />
  );
}
