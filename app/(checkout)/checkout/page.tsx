'use client'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCart } from '@/shared/hooks'
import React from 'react'
import { checkoutFormSchema, CheckoutFormValues } from '@/shared/constants'
import {
  CheckoutSidebar,
  Container,
  Title,
  CheckoutPersonalForm,
  CheckoutAddressForm,
  CheckoutCart,
} from '@/shared/components'

export default function Checkout() {
  const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart()

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  })

  const onSubmit = async (data: CheckoutFormValues) => {
    console.log(data)
  }

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
    updateItemQuantity(id, newQuantity)
  }

  return (
    <Container>
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px] mt-10"
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-40">
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                items={items}
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
              />
              <CheckoutPersonalForm />
              <CheckoutAddressForm />
            </div>

            <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}
