import { cn } from '@/shared/lib/utils'
import React from 'react'
import * as CartItem from './cart-item-details'
import { CartItemProps } from './cart-item-details/cart-item-details.types'
import { Trash2Icon } from 'lucide-react'

interface Props extends CartItemProps {
  className?: string
  onClickCountButton?: (type: 'plus' | 'minus') => void
  onClickRemoveItem?: () => void
}

export const CartDrawerItem: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  quantity,
  details,
  disabled,
  onClickCountButton,
  onClickRemoveItem,
  className,
}) => {  
  return (
    <div
      className={cn(
        'flex bg-white p-5 gap-6',
        { 'opacity-50 pointer-events-none': disabled },
        className
      )}
    >
      <CartItem.Image src={imageUrl} />
      <div className="flex-1">
        <CartItem.Info name={name} details={details} />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CartItem.CountButton onClick={onClickCountButton} value={quantity} />

          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <Trash2Icon
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
              onClick={onClickRemoveItem}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
