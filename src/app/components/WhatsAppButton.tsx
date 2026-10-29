"use client";

import { socialLinks } from '@/lib/social-links';
import { useTranslations } from 'next-intl';
import FaIcon from './FaIcon';

export default function WhatsAppButton() {
  const c = useTranslations('Common');
  return (
    <a
      href={socialLinks.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label={c('whats')}
      title={c('whats')}
    >
      <FaIcon name="fab fa-whatsapp" />
    </a>
  );
}
