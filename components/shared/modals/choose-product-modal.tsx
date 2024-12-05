'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Product } from '@prisma/client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { ChooseProductForm } from '../choose-product-form'
import { ProductWithRelations } from '@/@types/prisma'

interface Props {
  className?: string
  product: ProductWithRelations
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter()

  const isPizzaForrm = Boolean(product.items[0].pizzaType)

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className
        )}
      >
        {isPizzaForrm ? (
          'Pizza'
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={[]}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
