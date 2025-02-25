import React from 'react'
import { Title } from '@/shared/components'
import { Button } from '@/shared/components'
import { Plus } from 'lucide-react'
import { Ingredient } from '@prisma/client'
import { Link } from '@/i18n/routing'

interface Props {
  id: number
  name: string
  price: number
  imageUrl: string
  ingredients: Ingredient[]
  className?: string
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  className,
  ingredients,
}) => {

  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img src={imageUrl} alt={name} className="w-[215px] h-[215px]" />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <p className="text-sm text-gray-400">
          {ingredients.map((ingredient) => ingredient.name).join(' ,')}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            от <b>{price} ₴</b>
          </span>

          <Button variant="secondary">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  )
}
