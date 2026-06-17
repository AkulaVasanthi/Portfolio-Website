import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface ParticleBackgroundProps {
  isDarkMode: boolean;
}

export default function ParticleBackground({ isDarkMode }: ParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Responsive Canvas Resize Observer
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        width = newWidth;
        height = newHeight;
        canvas.width = newWidth;
        canvas.height = newHeight;

        // Initialize particles based on screen size
        const numParticles = Math.min(Math.floor((newWidth * newHeight) / 12000), 100);
        particles = [];
        for (let i = 0; i < numParticles; i++) {
          const isPrimary = Math.random() > 0.4;
          particles.push({
            x: Math.random() * newWidth,
            y: Math.random() * newHeight,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            radius: Math.random() * 2.5 + 1,
            color: isPrimary 
              ? (isDarkMode ? 'rgba(124, 58, 237, 0.4)' : 'rgba(109, 40, 217, 0.25)') // Purple
              : (isDarkMode ? 'rgba(6, 182, 212, 0.4)' : 'rgba(14, 116, 144, 0.25)')   // Cyan
          });
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Capture Mouse Move inside container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: -1000, y: -1000 });
    };

    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('mousemove', handleMouseMove);
      currentContainer.addEventListener('mouseleave', handleMouseLeave);
    }

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse Glow Effect (Dynamic backdrop gradients)
      if (mousePosition.x > -500) {
        const glowRadius = 300;
        const gradient = ctx.createRadialGradient(
          mousePosition.x, mousePosition.y, 0,
          mousePosition.x, mousePosition.y, glowRadius
        );
        if (isDarkMode) {
          gradient.addColorStop(0, 'rgba(124, 58, 237, 0.08)');
          gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.04)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          gradient.addColorStop(0, 'rgba(124, 58, 237, 0.05)');
          gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.02)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mousePosition.x, mousePosition.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Neural connections between nodes
      const maxDistance = 120;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const alpha = (1 - distance / maxDistance) * 0.15;
            ctx.strokeStyle = isDarkMode 
              ? `rgba(139, 92, 246, ${alpha})`
              : `rgba(109, 40, 217, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Interaction with mouse
        if (mousePosition.x > -500) {
          const dx = p1.x - mousePosition.x;
          const dy = p1.y - mousePosition.y;
          const distToMouse = Math.sqrt(dx * dx + dy * dy);
          if (distToMouse < 200) {
            // Stronger glowing connection to mouse
            const alpha = (1 - distToMouse / 200) * 0.25;
            ctx.strokeStyle = isDarkMode
              ? `rgba(6, 182, 212, ${alpha})`
              : `rgba(14, 116, 144, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mousePosition.x, mousePosition.y);
            ctx.stroke();

            // Slight push/pull gravity effect
            const force = (200 - distToMouse) / 2000;
            p1.vx += (dx / distToMouse) * force * 0.1;
            p1.vy += (dy / distToMouse) * force * 0.1;
          }
        }

        // Particle speed damping
        const maxSpeed = 1.2;
        const currentSpeed = Math.sqrt(p1.vx * p1.vx + p1.vy * p1.vy);
        if (currentSpeed > maxSpeed) {
          p1.vx = (p1.vx / currentSpeed) * maxSpeed;
          p1.vy = (p1.vy / currentSpeed) * maxSpeed;
        }

        // Update Particle Position
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Boundaries Collision check
        if (p1.x < 0) { p1.x = width; }
        else if (p1.x > width) { p1.x = 0; }
        if (p1.y < 0) { p1.y = height; }
        else if (p1.y > height) { p1.y = 0; }

        // Render Particle Body
        ctx.fillStyle = p1.color;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();

        // Add soft halo glow
        if (isDarkMode && p1.radius > 2.2) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = '#06B6D4';
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, p1.radius + 1, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)';
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.shadowBlur = 0; // reset
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (currentContainer) {
        currentContainer.removeEventListener('mousemove', handleMouseMove);
        currentContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isDarkMode, mousePosition.x, mousePosition.y]);

  return (
    <div
      ref={containerRef}
      id="particles-container"
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
