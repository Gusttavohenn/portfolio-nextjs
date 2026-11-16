"use client";

import { useTranslations } from 'next-intl';
import { TbTable, TbWebhook, TbBrandWhatsapp, TbChecks } from 'react-icons/tb';

/*
 * Animação-tese do topo: uma linha de planilha vira uma chamada de API, que vira uma
 * mensagem no WhatsApp com confirmação. CSS puro, ciclo de 6 s.
 * Com "reduzir animações", fica parado no estado final (tudo visível).
 */
export default function AutomationStrip() {
  const t = useTranslations('HeroSection');
  return (
    <figure className="auto-strip" aria-label={t('stripLabel')}>
      <div className="as-node as-sheet">
        <p className="as-head"><TbTable aria-hidden="true" /> {t('stripPlanilha')}</p>
        <div className="as-row as-dim"><span>Ana Lima</span><span>17/11 09:00</span><span className="as-ok">{t('stripConfirmado')}</span></div>
        <div className="as-row as-hot"><span>Mariana Souza</span><span>18/11 10:00</span><span className="as-status"><span className="as-wait">{t('stripPendente')}</span><span className="as-done">{t('stripConfirmado')}</span></span></div>
        <div className="as-row as-dim"><span>Carlos Reis</span><span>18/11 14:30</span><span>{t('stripPendente')}</span></div>
      </div>

      <div className="as-wire" aria-hidden="true"><i className="as-packet p1" /></div>

      <div className="as-node as-api">
        <p className="as-head"><TbWebhook aria-hidden="true" /> Webhook</p>
        <code className="as-code">POST /lembretes</code>
        <code className="as-code as-200">200 OK</code>
      </div>

      <div className="as-wire" aria-hidden="true"><i className="as-packet p2" /></div>

      <div className="as-node as-chat">
        <p className="as-head"><TbBrandWhatsapp aria-hidden="true" /> WhatsApp</p>
        <p className="as-msg in">{t('stripMensagem')}</p>
        <p className="as-msg out">1 <TbChecks aria-hidden="true" /></p>
      </div>
      <figcaption className="sr-only">{t('stripLabel')}</figcaption>
    </figure>
  );
}
