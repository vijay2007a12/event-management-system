'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
}

interface MapPoint {
  x: number;
  y: number;
  label: string;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationIdRef = useRef<number>();
  const scrollRef = useRef({ y: 0, velocity: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const mapPoints: MapPoint[] = [
      { x: 0.18, y: 0.42, label: 'USA' },
      { x: 0.34, y: 0.36, label: 'UK' },
      { x: 0.46, y: 0.47, label: 'UAE' },
      { x: 0.58, y: 0.52, label: 'India' },
      { x: 0.72, y: 0.40, label: 'Japan' },
      { x: 0.78, y: 0.68, label: 'AUS' },
    ];

    const routes = [
      [mapPoints[0], mapPoints[1], mapPoints[2], mapPoints[3]],
      [mapPoints[3], mapPoints[4]],
      [mapPoints[3], mapPoints[5]],
      [mapPoints[1], mapPoints[4]],
    ];

    // Initialize particles
    const colors = ['#38bdf8', '#2dd4bf', '#f59e0b', '#e879f9'];
    const initializeParticles = () => {
      particlesRef.current = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };
    initializeParticles();

    const handleScroll = () => {
      const nextY = window.scrollY;
      scrollRef.current.velocity = nextY - scrollRef.current.y;
      scrollRef.current.y = nextY;
    };

    const drawDottedLine = (from: MapPoint, to: MapPoint, offset: number) => {
      const fromX = from.x * canvas.width;
      const fromY = from.y * canvas.height;
      const toX = to.x * canvas.width;
      const toY = to.y * canvas.height;
      const midX = (fromX + toX) / 2;
      const midY = Math.min(fromY, toY) - canvas.height * 0.11;
      const steps = 46;

      for (let i = 0; i <= steps; i++) {
        if ((i + Math.floor(offset)) % 3 !== 0) continue;

        const t = i / steps;
        const x = (1 - t) * (1 - t) * fromX + 2 * (1 - t) * t * midX + t * t * toX;
        const y = (1 - t) * (1 - t) * fromY + 2 * (1 - t) * t * midY + t * t * toY;

        ctx.beginPath();
        ctx.fillStyle = 'rgba(125, 211, 252, 0.58)';
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawMapScene = (time: number) => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#081b2d');
      gradient.addColorStop(0.42, '#0f2f34');
      gradient.addColorStop(0.72, '#16223d');
      gradient.addColorStop(1, '#231636');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 0.2;
      ctx.fillStyle = '#7dd3fc';
      for (let i = 0; i < 9; i++) {
        const x = ((i * 173 + time * 0.012) % canvas.width) - canvas.width * 0.08;
        const y = canvas.height * (0.18 + ((i * 29) % 58) / 100);
        ctx.beginPath();
        ctx.ellipse(x, y, canvas.width * 0.12, canvas.height * 0.08, -0.35, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      routes.forEach((route, routeIndex) => {
        for (let i = 0; i < route.length - 1; i++) {
          drawDottedLine(route[i], route[i + 1], time * 0.035 + routeIndex * 7);
        }
      });

      mapPoints.forEach((point, index) => {
        const x = point.x * canvas.width;
        const y = point.y * canvas.height;
        const pulse = 4 + Math.sin(time * 0.004 + index) * 2;

        ctx.beginPath();
        ctx.fillStyle = 'rgba(20, 184, 166, 0.16)';
        ctx.arc(x, y, 18 + pulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = '#f8fafc';
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1.5;
        ctx.arc(x, y, 8 + pulse * 0.35, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(226, 232, 240, 0.78)';
        ctx.font = '600 11px Segoe UI, sans-serif';
        ctx.fillText(point.label, x + 12, y - 10);
      });
    };

    const drawAirplane = (time: number) => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      const route = routes[0];
      const segmentProgress = scrollProgress * (route.length - 1);
      const segmentIndex = Math.min(route.length - 2, Math.floor(segmentProgress));
      const localT = segmentProgress - segmentIndex;
      const from = route[segmentIndex];
      const to = route[segmentIndex + 1];
      const fromX = from.x * canvas.width;
      const fromY = from.y * canvas.height;
      const toX = to.x * canvas.width;
      const toY = to.y * canvas.height;
      const midX = (fromX + toX) / 2;
      const midY = Math.min(fromY, toY) - canvas.height * 0.11;
      const x = (1 - localT) * (1 - localT) * fromX + 2 * (1 - localT) * localT * midX + localT * localT * toX;
      const y = (1 - localT) * (1 - localT) * fromY + 2 * (1 - localT) * localT * midY + localT * localT * toY;
      const nextT = Math.min(1, localT + 0.02);
      const nextX = (1 - nextT) * (1 - nextT) * fromX + 2 * (1 - nextT) * nextT * midX + nextT * nextT * toX;
      const nextY = (1 - nextT) * (1 - nextT) * fromY + 2 * (1 - nextT) * nextT * midY + nextT * nextT * toY;
      const angle = Math.atan2(nextY - y, nextX - x);

      ctx.save();
      ctx.translate(x, y + Math.sin(time * 0.006) * 2);
      ctx.rotate(angle);
      ctx.fillStyle = '#f8fafc';
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.85)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(18, 0);
      ctx.lineTo(-14, -8);
      ctx.lineTo(-8, 0);
      ctx.lineTo(-14, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-2, 0);
      ctx.lineTo(-18, -16);
      ctx.lineTo(-12, 0);
      ctx.lineTo(-18, 16);
      ctx.closePath();
      ctx.fillStyle = '#38bdf8';
      ctx.fill();
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      const time = performance.now();
      const scrollPush = Math.max(-4, Math.min(4, scrollRef.current.velocity * 0.04));
      scrollRef.current.velocity *= 0.88;

      drawMapScene(time);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy + scrollPush * (particle.radius * 0.35);

        // Bounce off walls
        if (particle.x - particle.radius < 0 || particle.x + particle.radius > canvas.width) {
          particle.vx *= -1;
          particle.x = Math.max(particle.radius, Math.min(canvas.width - particle.radius, particle.x));
        }
        if (particle.y - particle.radius < 0 || particle.y + particle.radius > canvas.height) {
          particle.vy *= -1;
          particle.y = Math.max(particle.radius, Math.min(canvas.height - particle.radius, particle.y));
        }

        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections
      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 1;

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const distance = Math.hypot(p2.x - p1.x, p2.y - p1.y);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      drawAirplane(time);
      ctx.globalAlpha = 1;
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ filter: 'saturate(1.08)' }}
    />
  );
};

export default ParticleBackground;
