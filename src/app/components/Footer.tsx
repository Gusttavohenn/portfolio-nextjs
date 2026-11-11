"use client";

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { TbDeviceGamepad2, TbArrowUp, TbClockHour4, TbDownload, TbTerminal2 } from 'react-icons/tb';
import { AchievementsCounter } from './Achievements';

const NAV = ['inicio', 'sobre', 'servicos', 'skills', 'jornada', 'projetos', 'certificados', 'contato'] as const;
const HREF: Record<(typeof NAV)[number], string> = {
  inicio: '#home', sobre: '#sobre', servicos: '#servicos', skills: '#skills',
  jornada: '#jornada', projetos: '#projetos', certificados: '#certificados', contato: '#contato',
};

// hora local de Itaúna (o visitante vê que horas são pro Gu)
function useLocalTime(locale: string) {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : locale, { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, [locale]);
  return time;
}

export default function Footer() {
  const t = useTranslations('Footer');
  const n = useTranslations('Navbar');
  const c = useTranslations('Common');
  const locale = useLocale();
  const time = useLocalTime(locale);
  const cvFile = `/Gustavo_Oliveira_${locale.toUpperCase()}.pdf`;

  return (
    <footer className="site-footer">
      <div className="footer-cols">
        <div className="footer-col">
          <h3>{t('navegar')}</h3>
          <ul>
            {NAV.map((k) => <li key={k}><a href={HREF[k]}>{n(k)}</a></li>)}
          </ul>
        </div>
        <div className="footer-col">
          <h3>{t('extras')}</h3>
          <ul>
            <li><button type="button" onClick={() => window.dispatchEvent(new Event('open-summary'))}><TbClockHour4 aria-hidden="true" /> {t('resumo')}</button></li>
            <li><a href={cvFile} download><TbDownload aria-hidden="true" /> {t('cv')}</a></li>
            <li><button type="button" onClick={() => window.dispatchEvent(new Event('open-terminal'))} title={c('terminalAtalho')}><TbTerminal2 aria-hidden="true" /> {t('terminal')} <kbd>/</kbd></button></li>
            <li><button type="button" onClick={() => window.dispatchEvent(new Event('open-arcade'))}><TbDeviceGamepad2 aria-hidden="true" /> {c('jogarDeploy')}</button></li>
            <li className="footer-ach"><AchievementsCounter /></li>
          </ul>
        </div>
        <div className="footer-col footer-clock">
          <h3>{t('agora')}</h3>
          <p className="footer-time" suppressHydrationWarning>{time ?? '--:--'}</p>
          <p className="footer-tz">UTC−3</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Gustavo Oliveira. {t('direitos')}</p>
        <p className="footer-made">{t('feito')}</p>
        <a href="#home" className="footer-top">{t('topo')} <TbArrowUp aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
