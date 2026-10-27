// Número no formato internacional (Brasil +55, DDD 37)
const WHATSAPP_NUMBER = '5537998730908';
const WHATSAPP_TEXT = encodeURIComponent('Olá, Gustavo! Vim pelo seu portfólio 👋');

export const socialLinks = {
  github: 'https://github.com/Gusttavohenn',
  linkedin: 'https://www.linkedin.com/in/gustavo-oliveira-0a96b022a/',
  email: 'gustavo_oliveira02@icloud.com',
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`,
} as const;
