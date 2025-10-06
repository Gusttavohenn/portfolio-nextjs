"use client";

// Importações de libs e componentes
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroSection from './components/sections/HeroSection';
import TimelineSection from './components/sections/TimelineSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ContactSection from './components/sections/ContactSection';

export default function Home() {

  // A lógica de interatividade continua aqui por enquanto,
  // pois ela orquestra elementos em toda a página.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ANIMAÇÕES COM GSAP
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

    // LÓGICA DOS MODALS
    const openModalTriggers = document.querySelectorAll<HTMLDivElement>('[data-modal-target]');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const closeAllModals = () => {
        document.querySelectorAll<HTMLDivElement>('.modal').forEach(modal => modal.style.display = 'none');
        if(modalBackdrop) modalBackdrop.style.display = 'none';
    };
    const openModal = (event: MouseEvent) => {
        const trigger = event.currentTarget as HTMLDivElement;
        const modalId = trigger.dataset.modalTarget;
        if(modalId) {
            const modal = document.getElementById(modalId);
            if(modal) modal.style.display = 'block';
            if(modalBackdrop) modalBackdrop.style.display = 'block';
        }
    };
    openModalTriggers.forEach(trigger => trigger.addEventListener('click', openModal));
    const closeButtons = document.querySelectorAll<HTMLButtonElement>('.modal-close-btn');
    closeButtons.forEach(button => button.addEventListener('click', closeAllModals));
    if(modalBackdrop) modalBackdrop.addEventListener('click', closeAllModals);

    // LÓGICA DO FORMULÁRIO
    const form = document.getElementById('contact-form') as HTMLFormElement;
    // ... (restante da lógica do formulário)
    const handleFormSubmit = (e: Event) => {
      e.preventDefault();
      // ... (código do fetch)
    };
    form.addEventListener('submit', handleFormSubmit);


    // Cleanup function
    return () => {
        filterButtons.forEach(button => button.removeEventListener('click', handleFilterClick));
        openModalTriggers.forEach(trigger => trigger.removeEventListener('click', openModal));
        form.removeEventListener('submit', handleFormSubmit);
    };
  }, []);

  return (
    <>
      <HeroSection />
      <TimelineSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      
      {/* Os Modals e o Backdrop ainda precisam ficar aqui, pois são controlados pela página */}
      <div className="modal-backdrop" id="modal-backdrop"></div>
      <div className="modal" id="modal-1">{/* ... conteúdo do modal 1 ... */}</div>
      <div className="modal" id="modal-2">{/* ... conteúdo do modal 2 ... */}</div>
    </>
  );
}