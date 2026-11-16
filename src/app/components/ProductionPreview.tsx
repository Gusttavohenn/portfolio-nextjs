"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { TbArrowRight } from 'react-icons/tb';
import { projects } from '@/lib/projects-data';
import { toLang } from '@/lib/cv';

/*
 * Prévia dos sistemas em produção no topo: as capas alternam sozinhas a cada 5 s
 * (pausa com o mouse em cima ou com foco; com "reduzir animações" não alterna sozinha).
 */
const SLUGS = ['alerta-plantao', 'painel-chamados'];
const INTERVAL = 5000;

export default function ProductionPreview() {
  const locale = useLocale();
  const lang = toLang(locale);
  const t = useTranslations('HeroSection');
  const tp = useTranslations('ProjectsSection');
  const items = SLUGS.map((s) => projects.find((p) => p.slug === s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % items.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, items.length]);

  if (!items.length) return null;
  const cur = items[i];
  const href = `/${locale}/projects/${cur.slug}`;

  return (
    <div
      className="prod-preview"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <p className="prod-label">{t('emProducao')}</p>
      <Link href={href} className="prod-frame" aria-label={`${tp('verProjeto')}: ${cur.title[lang]}`}>
        {items.map((p, n) => (
          <Image
            key={p.slug}
            src={`${p.cover}-${lang}.webp`}
            alt={p.title[lang]}
            fill
            priority={n === 0}
            sizes="(max-width: 900px) 100vw, 560px"
            className={n === i ? 'on' : ''}
            style={{ objectFit: 'cover' }}
          />
        ))}
      </Link>
      <div className="prod-foot">
        <div>
          <span className="proj-badge"><span className="proj-dot" aria-hidden="true" />{tp('producao')}</span>
          <p className="prod-title"><Link href={href}>{cur.title[lang]}</Link></p>
        </div>
        <div className="prod-dots" role="group" aria-label={t('emProducao')}>
          {items.map((p, n) => (
            <button key={p.slug} type="button" className={n === i ? 'on' : ''} aria-pressed={n === i} aria-label={p.title[lang]} onClick={() => setI(n)} />
          ))}
        </div>
      </div>
      <Link href={href} className="proj-link main prod-cta">{tp('verProjeto')} <TbArrowRight aria-hidden="true" /></Link>
    </div>
  );
}
