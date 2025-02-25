'use client'
import React from 'react'
import toast from 'react-hot-toast'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCart } from '@/shared/hooks'
import { checkoutFormSchema, CheckoutFormValues } from '@/shared/constants'
import { createOrder } from '@/app/actions'
import { useSession } from 'next-auth/react'
import {
  CheckoutSidebar,
  Container,
  Title,
  CheckoutPersonalForm,
  CheckoutAddressForm,
  CheckoutCart,
} from '@/shared/components'
import { Api } from '@/shared/services/api-client'
import { useTranslations } from 'next-intl'

export default function Checkout() {
  const t = useTranslations('CartPage')
  const { data: session } = useSession()
  const [submitting, setSubmitting] = React.useState(false)
  const { totalAmount, items, updateItemQuantity, removeCartItem, loading } =
    useCart()

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

  React.useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe()
      const [firstName, lastName] = data.fullName.split(' ')

      form.setValue('firstName', firstName)
      form.setValue('lastName', lastName)
      form.setValue('email', data.email)
    }

    if (session) {
      fetchUserInfo()
    }
  }, [session])

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      const url = await createOrder(data)
      setSubmitting(true)
      toast.success(t('Order successfully placed! Proceed to payment'), {
        icon: '✅',
      })
      if (url) {
        location.href = url
      }
    } catch (error) {
      console.error(error)
      setSubmitting(false)
      toast.error(t('Failed to create order'), {
        icon: '❌',
      })
    }
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
        text={t('Placing an order')}
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
                loading={loading}
              />
              <CheckoutPersonalForm
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />
              <CheckoutAddressForm
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />
            </div>

            <div className="w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}
