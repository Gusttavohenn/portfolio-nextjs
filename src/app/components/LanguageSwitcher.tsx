"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const locales = [
  { code: 'pt', flag: '🇧🇷', label: 'Português' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const getLocalePath = (locale: string) => {
    const segments = pathname.split('/').filter(Boolean);
    const currentLocales = ['pt', 'en', 'es'];
    if (currentLocales.includes(segments[0])) {
      segments[0] = locale;
    } else {
      segments.unshift(locale);
    }
    return '/' + segments.join('/');
  };

  const currentLocale = pathname.split('/').filter(Boolean)[0] ?? 'pt';

  return (
    <div className="language-switcher">
      {locales.map(({ code, flag, label }) => (
        <Link
          key={code}
          href={getLocalePath(code)}
          className={`flag-btn ${currentLocale === code ? 'active' : ''}`}
          title={label}
          aria-label={label}
        >
          {flag}
        </Link>
      ))}
    </div>
  );
}
