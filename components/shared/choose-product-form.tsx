import React from 'react'
import { Title } from './title'
import { cn } from '@/lib/utils'
import { ProductImage } from './product-image'
import { Button } from '../ui'

interface Props {
  imageUrl: string
  name: string
  ingredients: any[]
  items?: any[]
  onClickAdd?: VoidFunction
  className?: string
}

export const ChooseProductForm: React.FC<Props> = ({
  imageUrl,
  name,
  ingredients,
  items,
  onClickAdd,
  className,
}) => {
  const textDetaills =
    'Соус Пелаті, соус вершковий, сир Моцарела, печериці, опеньки, цибуля марс, корнішони.'
  const totalPrice = 200
  return (
    <div className={cn(className, 'flex flex-1')}>
      <ProductImage imageUrl={imageUrl} size={30} />

      <div className="w-[490px] bg-[#FFF7EE] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetaills}</p>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full">
          Добавить в корзину за {totalPrice} ₴
        </Button>
      </div>
    </div>
  )
}
