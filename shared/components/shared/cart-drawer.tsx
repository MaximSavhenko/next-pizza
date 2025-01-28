'use client'

import React from 'react'
import emptyBox from '../../../public/assets/images/empty-box.png'
import Image from 'next/image'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet'
import { Button } from '../ui'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { CartDrawerItem } from './cart-drawer-item'
import { getCartItemDetails } from '@/shared/lib'
import { PizzaSize, PizzaType } from '@/shared/constants/pizza'
import { Title } from './title'
import { useCart } from '@/shared/hooks'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

interface Props {
  className?: string
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart()

  const [redirecting, setRedirecting] = React.useState(false)

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
    updateItemQuantity(id, newQuantity)
  }

  const t = useTranslations('HomePage')

  const quantityItems =
    items.length > 1
      ? `${items.length} ${t('Cart.products')}`
      : `${items.length} ${t('Cart.product')}`

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        {totalAmount > 0 && (
          <>
            <SheetHeader>
              <SheetTitle>
                {t('Cart.In the basket')}{' '}
                <span className="font-bold">{quantityItems}</span>
              </SheetTitle>
            </SheetHeader>
          </>
        )}

        {!totalAmount && (
          <div className="flex flex-col items-center justify-center w-72 m-auto">
            <Image src={emptyBox} alt="empty cart" width={120} height={120} />
            <Title
              size="sm"
              text={t('Cart.The basket is empty')}
              className="text-center font-bold my-2"
            />
            <p className="text-center text-neutral-500 mb-5">
              {t('Cart.Add at least one pizza to complete your order')}
            </p>
            <SheetClose>
              <Button size="lg" className="h-12 text-base">
                <ArrowLeft className="w-5 mr-2" />
                {t('Cart.Go back')}
              </Button>
            </SheetClose>
          </div>
        )}

        {totalAmount > 0 && (
          <>
            <div className="-mx-6 mt-5 overflow-auto flex-1">
              {items.map((item) => (
                <div key={item.id} className="mb-2">
                  <CartDrawerItem
                    id={item.id}
                    imageUrl={item.imageUrl}
                    details={getCartItemDetails(
                      item.ingredients,
                      item.pizzaType as PizzaType,
                      item.pizzaSize as PizzaSize
                    )}
                    disabled={item.disabled}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    onClickCountButton={(type) =>
                      onClickCountButton(item.id, item.quantity, type)
                    }
                    onClickRemoveItem={() => removeCartItem(item.id)}
                  />
                </div>
              ))}
            </div>

            <SheetFooter className="-mx-6 bg-white p-8">
              <div className="w-full">
                <div className="flex mb-4">
                  <span className="flex flex-1 text-lg text-neutral-500">
                      {t('Cart.Total')}
                    <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                  </span>
                  <span className="font-bold text-lg">{totalAmount} ₴</span>
                </div>
                <Link href={'/checkout'}>
                  <Button
                    onClick={() => setRedirecting(true)}
                    loading={redirecting}
                    type="submit"
                    className="w-full h-12 text-base"
                  >
                    {t('Cart.Place an order')}
                    <ArrowRight className="w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
