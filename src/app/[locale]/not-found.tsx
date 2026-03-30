"use client";

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFound');
  const locale = useLocale();

  return (
    <section style={{ textAlign: 'center', padding: '10rem 2rem' }}>
      <h1 style={{ fontSize: '6rem', fontWeight: 900, margin: 0, lineHeight: 1 }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', margin: '1rem 0' }}>{t('titulo')}</h2>
      <p style={{ marginBottom: '2rem', opacity: 0.7 }}>{t('descricao')}</p>
      <Link href={`/${locale}`} className="cta-button">
        {t('voltar')}
      </Link>
    </section>
  );
}
