import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
  className?: string
}

export const RequiredSymbol: React.FC<Props> = ({ className }) => {
  return <span className={cn('text-red-500', className)}>* </span>
}
