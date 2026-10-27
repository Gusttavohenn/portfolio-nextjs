"use client";

import { useTranslations } from 'next-intl';
import { socialLinks } from '@/lib/social-links';
import { TbDeviceGamepad2 } from 'react-icons/tb';

export default function Footer() {
    const t = useTranslations('Footer');
    const c = useTranslations('Common');

    return (
        <footer>
            <div className="social-links">
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fab fa-github"></i></a>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
            </div>
            <p>&copy; {new Date().getFullYear()} Gustavo Oliveira. {t('direitos')}</p>
            <button
                className="footer-terminal-btn"
                onClick={() => window.dispatchEvent(new Event('open-terminal'))}
                aria-label={c('terminal')}
                title={c('terminalAtalho')}
            >
                &gt;_
            </button>
            <button
                className="footer-terminal-btn"
                onClick={() => window.dispatchEvent(new Event('open-arcade'))}
                aria-label={c('jogarDeploy')}
                title={c('jogarDeploy')}
            >
                <TbDeviceGamepad2 aria-hidden="true" /> {c('jogar')}
            </button>
        </footer>
    );
}
