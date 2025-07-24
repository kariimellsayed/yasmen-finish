'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';




type LocaleSwitcherProps = {
  currentLocale: 'en' | 'ar';
};  



export default function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const newLocale = currentLocale === 'en' ? 'ar' : 'en';


  const getNewPath = (path: string, locale: string) => {
    if (/^\/(en|ar)/.test(path)) {

      return path.replace(/^\/(en|ar)/, `/${locale}`);
    } else {
      return `/${locale}${path.startsWith('/') ? '' : '/'}${path}`;
    }
  };

  const newPath = getNewPath(pathname, newLocale);

  const handleSwitch = () => {
    router.push(newPath);
  };

  return (
    <button
      onClick={handleSwitch}
      className="p-3 rounded-2xl bg-gray-800 text-white hover:bg-gray-700 transition cursor-pointer text-sm"
    >
      {newLocale === 'ar' ? 'العربية' : 'English'}
    </button>
  );
}
