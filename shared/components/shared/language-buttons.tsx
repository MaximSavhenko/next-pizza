'use client'

import { usePathname } from '@/i18n/routing'
import { cn } from '@/shared/lib/utils'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import React from 'react'

export const LanguageButtons: React.FC = () => {
  const pathname = usePathname()
  const locale = useLocale()

  return (
    <div className="flex space-x-2">
      {['en', 'uk'].map((lang) => (
        <Link
          key={lang}
          href={`/${lang}${pathname}`}
          className={cn(
            `px-4 py-2 rounded ${
              locale === lang ? 'bg-primary text-white' : 'bg-gray-200'
            }`
          )}
        >
          {lang.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
