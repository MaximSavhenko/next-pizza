'use client'

import { ProductWithRelations } from '@/@types/prisma'
import { useCartStore } from '@/shared/store'
import React from 'react'
import toast from 'react-hot-toast'
import { useShallow } from 'zustand/react/shallow'
import { ChoosePizzaForm } from './choose-pizza-form'
import { ChooseProductForm } from './choose-product-form'

interface Props {
  onSubmit?: VoidFunction
  product: ProductWithRelations
}

export const ProductForm: React.FC<Props> = ({
  onSubmit: _onSubmit,
  product,
}) => {
  const [addCartItem, loading] = useCartStore(
    useShallow((state) => [state.addCartItem, state.loading])
  )

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id

      await addCartItem({
        productItemId: itemId,
        ingredients,
      })

      toast.success(product.name + ' уже в корзине! :)')
      _onSubmit?.()
    } catch (error) {
      toast.error('Не удалось добавить товар в корзину :(')
      console.error(error)
    }
  }

  const firstItem = product.items[0]
  const isPizzaForrm = Boolean(firstItem.pizzaType)

  if (isPizzaForrm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    )
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  )
}
