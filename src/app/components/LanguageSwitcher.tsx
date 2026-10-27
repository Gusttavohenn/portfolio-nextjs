"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const locales = [
  { code: 'pt', label: 'Português' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
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
      {locales.map(({ code, label }) => (
        <Link
          key={code}
          href={getLocalePath(code)}
          className={`flag-btn lang-btn ${currentLocale === code ? 'active' : ''}`}
          aria-current={currentLocale === code ? 'true' : undefined}
          title={label}
          aria-label={label}
        >
          {code.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
