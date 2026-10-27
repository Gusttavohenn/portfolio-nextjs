"use client";

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import RobotSprite from '../components/RobotSprite';

export default function NotFound() {
  const t = useTranslations('NotFound');
  const locale = useLocale();

  return (
    <section className="notfound-page">
      <div className="notfound-code" aria-hidden="true">
        <span>4</span>
        <span className="notfound-zero">0</span>
        <span>4</span>
      </div>

      <div className="notfound-stage" aria-hidden="true">
        <div className="notfound-walker">
          <div className="notfound-robot">
            <RobotSprite />
            <span className="notfound-lens"></span>
          </div>
          <span className="notfound-think">?</span>
        </div>
        <div className="notfound-ground"></div>
      </div>

      <h1 className="notfound-title">{t('titulo')}</h1>
      <p className="notfound-desc">{t('descricao')}</p>
      <Link href={`/${locale}`} className="cta-button">
        {t('voltar')}
      </Link>
    </section>
  );
}
