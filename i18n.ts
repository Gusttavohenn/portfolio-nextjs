import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  // Aguarda o locale da requisição
  let locale = await requestLocale;
  
  // Se não houver locale, usa o padrão
  if (!locale) {
    locale = 'pt';
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});