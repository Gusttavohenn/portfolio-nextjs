"use client";

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function BackToTop() {
  const c = useTranslations('Common');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="back-to-top"
      aria-label={c('topo')}
    >
      <i className="fa-solid fa-chevron-up" aria-hidden="true"></i>
    </button>
  );
}
