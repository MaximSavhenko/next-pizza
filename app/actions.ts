'use server'

import { CheckoutFormValues } from '@/shared/constants'
import { prisma } from '@/prisma/prisma-client'
import { OrderStatus, Prisma } from '@prisma/client'
import { cookies } from 'next/headers'
import { generateLiqPayLink, sendEmail } from '@/shared/lib'
import { PayOrderTemplate, VerificationUserTemplate } from '@/shared/components'
import { getUserSession } from '@/shared/lib/get-user-session'
import { hashSync } from 'bcrypt'

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
        items: userCart.items,
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

    const paymentUrl = paymentData.checkoutUrl

    await sendEmail(
      data.email,
      'Next Pizza / Оплатите заказ#' + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      })
    )

    return paymentUrl
  } catch (error) {
    console.error('[CreateOrder] Server error ', error)
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession()
    if (!currentUser) {
      throw new Error('Пользователь не найден')
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    })

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
      },
    })
  } catch (error) {
    console.log('Error [UPDATE_USER]', error)
    throw error
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    })

    if (user) {
      if (!user.verified) {
        throw Error('Почта не найдена')
      }

      throw Error('Пользователь с такой почтой уже существует')
    }

    const createUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    })

    const code = Math.floor(100000 + Math.random() * 900000).toString()

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createUser.id,
      },
    })

    await sendEmail(
      createUser.email,
      'Next Pizza / Подтверждение регистрации ✉️',
      VerificationUserTemplate({
        code,
      })
    )
  } catch (error) {
    console.log('Error [REGISTER_USER]', error)
    throw error
  }
}
