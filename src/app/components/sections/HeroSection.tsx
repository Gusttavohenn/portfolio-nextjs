"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { TbSparkles, TbBrandWhatsapp, TbBriefcase } from 'react-icons/tb';
import { getCompany } from '@/lib/visit';
import { PROFILE_PHOTO } from '@/lib/profile';
import AutomationStrip from '../AutomationStrip';
import ProductionPreview from '../ProductionPreview';

const WHATSAPP_NUMBER = '5537998730908';

export default function HeroSection() {
  const t = useTranslations('HeroSection');
  const [company, setCompany] = useState<string | null>(null);
  useEffect(() => { setCompany(getCompany()); }, []);
  const quote = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('msgProjeto'))}`;

  return (
    <section id="home" className="section hero-v2">
      <div className="hero-grid">
        <div className="hero-main">
          {company && (
            <p className="hero-company"><TbSparkles aria-hidden="true" /> {t('paraEmpresa', { empresa: company })}</p>
          )}
          <div className="hero-who">
            <span className="hero-photo" aria-hidden={!PROFILE_PHOTO}>
              {PROFILE_PHOTO
                ? <Image src={PROFILE_PHOTO} alt="Gustavo Oliveira" width={112} height={112} priority />
                : <span>GO</span>}
            </span>
            <span>
              <span className="hero-person">Gustavo Oliveira</span>
              <span className="hero-job">{t('cargo')}</span>
            </span>
          </div>

          <h1 className="hero-thesis">{t('tese')}</h1>
          <p className="hero-lead">{t('lead')}</p>
          <p className="hero-stack"><span className="sr-only">{t('stackLabel')}: </span>PHP/Laravel · C#/.NET · Node.js · SQL</p>

          <div className="hero-ctas">
            <a className="hero-btn primary" href={quote} target="_blank" rel="noopener noreferrer">
              <TbBrandWhatsapp aria-hidden="true" /> {t('tenhoProjeto')}
            </a>
            <button type="button" className="hero-btn" onClick={() => window.dispatchEvent(new Event('open-summary'))}>
              <TbBriefcase aria-hidden="true" /> {t('souRecrutador')}
            </button>
          </div>
        </div>

        <ProductionPreview />
      </div>

      <AutomationStrip />
    </section>
  );
}
