"use client";

import { useEffect, useRef } from "react";

interface ParticleTextProps {
  words: string[];
  color?: string;
}

interface P {
  x: number;
  y: number;
  hx: number; // home (target) x
  hy: number; // home (target) y
  vx: number;
  vy: number;
  size: number;
}

export default function ParticleText({ words, color = "#8b5cf6" }: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles: P[] = [];
    let wordIndex = 0;
    // phases: 'forming' -> 'holding' -> 'dispersing'
    let phase: "forming" | "holding" | "dispersing" = "forming";
    let phaseStart = performance.now();
    const HOLD_MS = 1600;
    const FORM_MS = 1300;
    const DISPERSE_MS = 900;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildTargets(words[wordIndex]);
    };

    // Sample a word into target points using an offscreen canvas
    const sampleWord = (word: string): { x: number; y: number }[] => {
      const off = document.createElement("canvas");
      const octx = off.getContext("2d");
      if (!octx) return [];
      off.width = Math.max(300, width);
      off.height = Math.max(120, Math.min(height, 260));

      // pick a font size that fits the width
      let fontSize = Math.min(off.height * 0.9, (off.width / Math.max(word.length, 1)) * 1.6);
      fontSize = Math.max(40, Math.min(fontSize, 190));
      octx.fillStyle = "#fff";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.font = `900 ${fontSize}px Poppins, system-ui, sans-serif`;
      octx.fillText(word, off.width / 2, off.height / 2);

      const data = octx.getImageData(0, 0, off.width, off.height).data;
      const points: { x: number; y: number }[] = [];
      // density step — smaller = more particles
      const gap = window.innerWidth < 640 ? 5 : 4;
      const offsetX = (width - off.width) / 2;
      const offsetY = (height - off.height) / 2;
      for (let y = 0; y < off.height; y += gap) {
        for (let x = 0; x < off.width; x += gap) {
          const idx = (y * off.width + x) * 4;
          if (data[idx + 3] > 128) {
            points.push({ x: x + offsetX, y: y + offsetY });
          }
        }
      }
      return points;
    };

    const buildTargets = (word: string) => {
      const points = sampleWord(word);
      // reuse / resize particle array
      if (particles.length < points.length) {
        while (particles.length < points.length) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            hx: 0,
            hy: 0,
            vx: 0,
            vy: 0,
            size: Math.random() * 1.4 + 1,
          });
        }
      } else if (particles.length > points.length) {
        particles.length = points.length;
      }
      for (let i = 0; i < particles.length; i++) {
        particles[i].hx = points[i].x;
        particles[i].hy = points[i].y;
      }
    };

    const scatter = () => {
      for (const p of particles) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        p.vx = Math.cos(angle) * speed;
        p.vy = Math.sin(angle) * speed;
      }
    };

    const animate = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      const elapsed = now - phaseStart;

      if (phase === "forming") {
        for (const p of particles) {
          // ease toward home
          p.x += (p.hx - p.x) * 0.08 + p.vx;
          p.y += (p.hy - p.y) * 0.08 + p.vy;
          p.vx *= 0.9;
          p.vy *= 0.9;
        }
        if (elapsed > FORM_MS) {
          phase = "holding";
          phaseStart = now;
        }
      } else if (phase === "holding") {
        for (const p of particles) {
          // gentle settle + subtle shimmer
          p.x += (p.hx - p.x) * 0.2;
          p.y += (p.hy - p.y) * 0.2;
        }
        if (elapsed > HOLD_MS) {
          phase = "dispersing";
          phaseStart = now;
          scatter();
        }
      } else {
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.96;
          p.vy *= 0.96;
        }
        if (elapsed > DISPERSE_MS) {
          wordIndex = (wordIndex + 1) % words.length;
          buildTargets(words[wordIndex]);
          phase = "forming";
          phaseStart = now;
        }
      }

      ctx.fillStyle = color;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    resize();

    if (prefersReduced) {
      // static: just paint the first word in place
      for (const p of particles) {
        p.x = p.hx;
        p.y = p.hy;
      }
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      rafRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [words, color]);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}
