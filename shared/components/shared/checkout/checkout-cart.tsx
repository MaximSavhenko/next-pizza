import React from 'react'
import { WhiteBlock } from '../white-block'
import { CheckoutItem } from '../checkout-item'
import { getCartItemDetails } from '@/shared/lib'
import { PizzaSize, PizzaType } from '@/shared/constants/pizza'
import { CartStateItem } from '@/shared/lib/get-cart-details'
import { CheckoutItemSkeleton } from '../checkout-item-skeleton'
import { useTranslations } from 'next-intl'

interface Props {
  items: CartStateItem[]
  onClickCountButton: (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => void
  removeCartItem: (id: number) => void
  className?: string
  loading?: boolean
}

export const CheckoutCart: React.FC<Props> = ({
  className,
  items,
  onClickCountButton,
  removeCartItem,
  loading,
}) => {
  const t = useTranslations('CartPage')
  return (
    <WhiteBlock title={t('Basket')} className={className}>
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array(4)].map((_, index) => (
              <CheckoutItemSkeleton key={index} className="h-20" />
            ))
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={getCartItemDetails(
                  item.ingredients,
                  item.pizzaType as PizzaType,
                  item.pizzaSize as PizzaSize
                )}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onClickCountButton={(type) =>
                  onClickCountButton(item.id, item.quantity, type)
                }
                onClickRemove={() => removeCartItem(item.id)}
                disabled={item.disabled}
              />
            ))}
      </div>
    </WhiteBlock>
  )
}
