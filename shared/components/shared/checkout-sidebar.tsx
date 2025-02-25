import React from 'react'
import { WhiteBlock } from './white-block'
import { CheckoutItemDetails } from './checkout-item-details'
import { Button, Skeleton } from '../ui'
import { ArrowRight, Package, Percent, Truck } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { useTranslations } from 'next-intl'

interface Props {
  totalAmount: number
  loading?: boolean
  submitting?: boolean
  className?: string
}
const VAT = 15
const DELIVERY_PRICE = 100
export const CheckoutSidebar: React.FC<Props> = ({
  className,
  totalAmount,
  loading,
}) => {
  const t = useTranslations('CartPage')
  const vatPrice = (totalAmount * VAT) / 100
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice

  return (
    <WhiteBlock className={cn('p-6 sticky top-4', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">{t('Total')}:</span>
        {loading ? (
          <Skeleton className="w-48 h-11" />
        ) : (
          <span className=" h-11 text-[34px] font-extrabold">
            {totalPrice} ₴
          </span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-300" />
            {t('Basket price')}:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="w-16 h-6 rounded-[6px]" />
          ) : (
            `${totalAmount} ₴`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-2 text-gray-300" />
            {t('Taxes')}:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="w-16 h-6 rounded-[6px]" />
          ) : (
            `${vatPrice} ₴`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-300" />
            {t('Delivery')}:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="w-16 h-6 rounded-[6px]" />
          ) : (
            `${DELIVERY_PRICE} ₴`
          )
        }
      />
      <Button
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
        loading={loading}
      >
        {t('Proceed to payment')}
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  )
}
