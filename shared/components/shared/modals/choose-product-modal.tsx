'use client'

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { useRouter } from 'next/navigation'
import { ChooseProductForm } from '../choose-product-form'
import { ProductWithRelations } from '@/@types/prisma'
import { ChoosePizzaForm } from '../choose-pizza-form'
import { useCartStore } from '@/shared/store'
import toast from 'react-hot-toast'
import { useShallow } from 'zustand/react/shallow'

interface Props {
  className?: string
  product: ProductWithRelations
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter()
  const firstItem = product.items[0]
  const isPizzaForrm = Boolean(firstItem.pizzaType)
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
      router.back()
    } catch (error) {
      toast.error('Не удалось добавить товар в корзину :(')
      console.error(error)
    }
  }

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden',
          className
        )}
        aria-describedby={undefined}
      >
        <DialogTitle className="hidden">{product.name}</DialogTitle>
        {isPizzaForrm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            onSubmit={onSubmit}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            onSubmit={onSubmit}
            price={firstItem.price}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
