"use client";

import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (locale: string) => {
    // Remove o locale atual do pathname, se existir
    const newPath = pathname.replace(/^\/(pt|en|es)/, '');
    router.push(`/${locale}${newPath || '/'}`);
  };

  return (
    <div className="language-switcher">
      <button onClick={() => switchLocale('pt')}>PT</button>
      <button onClick={() => switchLocale('en')}>EN</button>
      <button onClick={() => switchLocale('es')}>ES</button>
    </div>
  );
}