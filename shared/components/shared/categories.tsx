'use client'

import React from 'react'
import { cn } from '@/shared/lib/utils'
import { useCategoryStore } from '@/shared/store/category'
import { Category } from '@prisma/client'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

interface Props {
  items: Category[]
  className?: string
}

export const Categories: React.FC<Props> = ({ className, items }) => {
  const t = useTranslations('HomePage')
  const categoryActiveId = useCategoryStore((state) => state.activeId)
  return (
    <div
      className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}
    >
      {items.map(({ name, id }, index) => (
        <Link
          href={`/#${name}`}
          key={index}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === id &&
              'bg-white shadow-sm shadow-gray-200 text-primary'
          )}
        >
          <button type='button'>{t(name)}</button>
        </Link>
      ))}
    </div>
  )
}
