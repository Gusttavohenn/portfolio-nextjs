"use client";

import { socialLinks } from '@/lib/social-links';

export default function WhatsAppButton() {
  return (
    <a
      href={socialLinks.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="Chamar no WhatsApp"
      title="Chamar no WhatsApp"
    >
      <i className="fab fa-whatsapp" aria-hidden="true"></i>
    </a>
  );
}
