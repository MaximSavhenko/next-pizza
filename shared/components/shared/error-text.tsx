import { cn } from '@/shared/lib/utils'
import { useTranslations } from 'next-intl'
import React from 'react'

interface Props {
  text: string
  className?: string
}

export const ErrorText: React.FC<Props> = ({ text, className }) => {
  const t = useTranslations('HomePage')
  return <p className={cn('text-red-500 text-sm', className)}>{t(`AuthModal.${text}`)}</p>
}
