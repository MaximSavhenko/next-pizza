import React from 'react'
import { Title } from './title'
import { cn } from '@/shared/lib/utils'
import { Button } from '../ui'

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
  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className="flex flex-1 items-center justify-center relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>

      <div className="w-[490px] bg-[#FFF7EE] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <Button
          loading={loading}
          onClick={()=> onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {price} ₴
        </Button>
      </div>
    </div>
  )
}
