import React from 'react'
import { Title } from './title'
import { cn } from '@/shared/lib/utils'
import { Button } from '../ui'
import { useTranslations } from 'next-intl'

interface Props {
  imageUrl: string
  name: string
  price: number
  onSubmit?: VoidFunction
  className?: string
  loading?: boolean
}

export const ChooseProductForm: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  onSubmit,
  className,
  loading,
}) => {
  const t = useTranslations('HomePage')
  return (
    <div className={cn(className, 'flex flex-1 justify-between')}>
      <div className="flex flex-1 items-center justify-center relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>

      <div className="w-[490px] bg-[#FFF7EE] p-7 flex flex-1 flex-col justify-between">
        <Title text={t(`ProductItem.${name}`)} size="md" className="font-extrabold mb-1" />
        <Button
          loading={loading}
          onClick={()=> onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          {t('Add to cart for')} {price} ₴
        </Button>
      </div>
    </div>
  )
}
