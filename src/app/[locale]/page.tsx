"use client";

// Importações de libs e componentes
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import TimelineSection from '../components/sections/TimelineSection';
import SkillsSection from '../components/sections/SkillsSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import CertificatesSection from '../components/sections/CertificatesSection';
import ContactSection from '../components/sections/ContactSection';

export default function Home() {

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ANIMAÇÕES DE ENTRADA COM GSAP
    gsap.from(".hero p, .hero .button-group", { delay: 0.5, duration: 1, y: 30, opacity: 0, stagger: 0.2, ease: "power3.out" });
    gsap.utils.toArray<HTMLElement>(".timeline-item").forEach(item => { gsap.from(item, { x: item.offsetLeft > 0 ? 100 : -100, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 80%", toggleActions: "play none none none" } }); });
    gsap.utils.toArray<HTMLElement>(".skill-category").forEach(category => { gsap.from(category, { y: 50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: category, start: "top 85%", toggleActions: "play none none none" } }); });

    // LÓGICA DO ACTIVE LINK NA NAVBAR COM SCROLL
    const sections = gsap.utils.toArray<HTMLElement>('.section');
    const navLinks = gsap.utils.toArray<HTMLAnchorElement>('.navbar nav a');

    // Mapeia seções sem link no nav para o link mais próximo
    const sectionNavMap: Record<string, string> = { jornada: 'sobre' };

    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onToggle: self => {
          if (self.isActive) {
            const rawId = section.getAttribute('id') ?? '';
            const id = sectionNavMap[rawId] ?? rawId;
            navLinks.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              }
            });
          }
        }
      });
    });

    // Cleanup function para remover event listeners
    return () => {
        // Limpa os triggers do ScrollTrigger para evitar vazamento de memória
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificatesSection />
      <ContactSection />
      
      </>
  );
}