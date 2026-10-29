"use client";

import { useEffect } from 'react';

import HeroSection from '../components/sections/HeroSection';
import TechMarquee from '../components/TechMarquee';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import ProcessSection from '../components/sections/ProcessSection';
import TimelineSection from '../components/sections/TimelineSection';
import SkillsSection from '../components/sections/SkillsSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import CertificatesSection from '../components/sections/CertificatesSection';
import ContactSection from '../components/sections/ContactSection';

/*
 * Animações de entrada ao rolar + link ativo do menu.
 * Antes era GSAP/ScrollTrigger; agora é IntersectionObserver + CSS (mais leve e sem "reflow forçado").
 */
const REVEAL_GROUPS: { selector: string; from: string; stagger: number }[] = [
  { selector: '.service-card', from: 'up', stagger: 90 },
  { selector: '.process-step', from: 'up', stagger: 110 },
  { selector: '.skill-category', from: 'up', stagger: 0 },
  { selector: '.project-card', from: 'up', stagger: 140 },
  { selector: '.timeline-item', from: 'side', stagger: 0 },
];

export default function Home() {

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers: number[] = [];
    let revealObs: IntersectionObserver | null = null;

    if (!reduce && 'IntersectionObserver' in window) {
      const items: HTMLElement[] = [];
      REVEAL_GROUPS.forEach(({ selector, from, stagger }) => {
        document.querySelectorAll<HTMLElement>(selector).forEach((el, i) => {
          // timeline: itens da direita vêm da direita, os da esquerda da esquerda
          const dir = from === 'side' ? (el.offsetLeft > 0 ? 'right' : 'left') : 'up';
          el.classList.add('reveal', `reveal-${dir}`);
          el.style.transitionDelay = `${stagger * (i % 6)}ms`;
          items.push(el);
        });
      });

      revealObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          revealObs?.unobserve(el);
          el.classList.add('in');
          // depois da animação, devolve o elemento ao estado normal (hover etc. voltam a funcionar)
          const delay = parseFloat(el.style.transitionDelay) || 0;
          timers.push(window.setTimeout(() => {
            el.classList.remove('reveal', 'reveal-up', 'reveal-left', 'reveal-right', 'in');
            el.style.transitionDelay = '';
          }, 900 + delay));
        });
      }, { rootMargin: '0px 0px -15% 0px' });
      items.forEach((el) => revealObs?.observe(el));
    }

    // link ativo do menu: a seção que cruza o meio da tela
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.navbar nav a'));
    const navObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
      });
    }, { rootMargin: '-50% 0px -50% 0px' });
    document.querySelectorAll('section.section[id]').forEach((sec) => navObs.observe(sec));

    return () => {
      revealObs?.disconnect();
      navObs.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <>
      <HeroSection />
      <TechMarquee />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <TimelineSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificatesSection />
      <ContactSection />
      
      </>
  );
}