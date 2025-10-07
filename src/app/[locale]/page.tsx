"use client";

// Importações de libs e componentes
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroSection from '../components/sections/HeroSection';
import TimelineSection from '../components/sections/TimelineSection';
import SkillsSection from '../components/sections/SkillsSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ContactSection from '../components/sections/ContactSection';

export default function Home() {

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ANIMAÇÕES DE ENTRADA COM GSAP
    gsap.from(".hero h1, .hero p, .hero .button-group", { delay: 0.5, duration: 1, y: 30, opacity: 0, stagger: 0.2, ease: "power3.out" });
    gsap.utils.toArray<HTMLElement>(".timeline-item").forEach(item => { gsap.from(item, { x: item.offsetLeft > 0 ? 100 : -100, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 80%", toggleActions: "play none none none" } }); });
    gsap.utils.toArray<HTMLElement>(".skill-category").forEach(category => { gsap.from(category, { y: 50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: category, start: "top 85%", toggleActions: "play none none none" } }); });

    // ANIMAÇÃO DE DIGITAÇÃO
    const typingText = document.querySelector('.typing-text') as HTMLElement;
    if (typingText) {
        const textToType = typingText.dataset.text || "";
        let index = 0;
        typingText.textContent = '';
        const type = () => { if (index < textToType.length) { typingText.textContent += textToType.charAt(index); index++; setTimeout(type, 150); } };
        setTimeout(type, 1000);
    }

    // LÓGICA DO FILTRO DE PROJETOS
    const filterButtons = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
    const projectCards = document.querySelectorAll<HTMLDivElement>('.project-card');
    const handleFilterClick = (event: MouseEvent) => {
        const button = event.currentTarget as HTMLButtonElement;
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.dataset.filter;
        projectCards.forEach(card => {
            const tags = card.dataset.tags;
            if (filter === '*' || (tags && filter && tags.includes(filter))) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
    };
    filterButtons.forEach(button => button.addEventListener('click', handleFilterClick));

    // LÓGICA DO ACTIVE LINK NA NAVBAR COM SCROLL
    const sections = gsap.utils.toArray<HTMLElement>('.section');
    const navLinks = gsap.utils.toArray<HTMLAnchorElement>('.navbar nav a');

    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onToggle: self => {
          if (self.isActive) {
            const id = section.getAttribute('id');
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

  return (
    <>
      <HeroSection />
      <TimelineSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      
      </>
  );
}