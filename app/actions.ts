'use server'

import { CheckoutFormValues } from '@/shared/constants'
import { prisma } from '@/prisma/prisma-client'
import { OrderStatus } from '@prisma/client'
import { cookies } from 'next/headers'
import { generateLiqPayLink, sendEmail } from '@/shared/lib'
import { PayOrderTemplate } from '@/shared/components'

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies()

    const cartToken = cookieStore.get('cartToken')?.value

    if (!cartToken) {
      throw new Error('Cart token not found')
    }
    // Находим корзину пользователя по токену
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    })
    // Если корзина не найдена, то выбрасываем ошибку
    if (!userCart) {
      throw new Error('Cart not found')
    }
    // Если корзина пуста, то выбрасываем ошибку
    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty')
    }
    // Создаем заказ  в базе данных => order
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    })

    // Очищаем корзину пользователя
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    })

    // Удаляем все товары из корзины пользователя
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    })

    // Мучения с liqpay payments

    const paymentData = await generateLiqPayLink({
      amount: order.totalAmount,
      orderId: order.id,
    })

    if (!paymentData) {
      throw new Error('Payment data not found')
    }

    await sendEmail(
      data.email,
      'Next Pizza / Оплатите заказ#' + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: paymentData.checkoutUrl,
      })
    )

    return paymentData.checkoutUrl
  } catch (error) {
    console.error('[CreateOrder] Server error ', error)
  }
}
