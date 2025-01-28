import { cn } from '@/shared/lib/utils'
import { useTranslations } from 'next-intl'

interface Props {
  name: string
  details: string
  className?: string
}

export const CartItemInfo: React.FC<Props> = ({ name, className, details }) => {
  const t = useTranslations('HomePage')
  return (
    <div>
      <div className={cn('flex items-center justify-between', className)}>
        <h2 className="text-lg font-bold flex-1 leading-6">{t(`ProductItem.${name}`)}</h2>
      </div>
      {details && <p className="text-xs text-gray-400 w-[90%]">{details}</p>}
    </div>
  )
}
