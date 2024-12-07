import React from 'react'
import { Title } from './title'
import { cn } from '@/shared/lib/utils'
import { Button } from '../ui'
import {
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from '@/shared/constants/pizza'
import { Ingredient } from '@prisma/client'
import {
  IngredientItem,
  PizzaImage,
  GroupVariants,
} from '@/shared/components/shared'
import { useSet } from 'react-use'

interface Props {
  imageUrl: string
  name: string
  ingredients: Ingredient[]
  items?: any[]
  onClickAdd?: VoidFunction
  className?: string
}

export const ChoosePizzaForm: React.FC<Props> = ({
  imageUrl,
  name,
  ingredients,
  items,
  onClickAdd,
  className,
}) => {
  const [size, setSize] = React.useState<PizzaSize>(20)
  const [type, setType] = React.useState<PizzaType>(1)

  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  )

  const textDetaills =
    'Соус Пелаті, соус вершковий, сир Моцарела, печериці, опеньки, цибуля марс, корнішони.'
  const totalPrice = 200

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#FFF7EE] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetaills}</p>

        <div className="flex flex-1 flex-col gap-5 mt-5">
          <GroupVariants
            items={pizzaSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₴
        </Button>
      </div>
    </div>
  )
}
