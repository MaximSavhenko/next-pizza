import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import querystring from 'querystring'
import { prisma } from '@/prisma/prisma-client'
import { OrderStatus } from '@prisma/client'
import { PaymentCallbackDatat } from '@/@types/liqpay'
import { CartItemDTO } from '@/shared/services/dto/cart.dto'
import { sendEmail } from '@/shared/lib'
import { OrderSuccessTemplate, OrderСanceledTemplate } from '@/shared/components'

export async function POST(req: NextRequest) {
  try {
    // Читаем сырое тело запроса как строку

    const body = await req.text()

    // Парсим строку как параметры запроса
    const parsedBody = querystring.parse(body)

    // Проверка, что 'data' является строкой, а не массивом
    const data = Array.isArray(parsedBody.data)
      ? parsedBody.data[0]
      : parsedBody.data

    if (!data || typeof data !== 'string') {
      return new Response('Invalid data format', { status: 400 })
    }

    // Проверка, что 'signature' является строкой
    const signature = Array.isArray(parsedBody.signature)
      ? parsedBody.signature[0]
      : parsedBody.signature

    if (!signature || typeof signature !== 'string') {
      return new Response('Invalid signature format', { status: 400 })
    }

    // Проверка подписи
    const validSignature = crypto
      .createHash('sha1')
      .update(
        process.env.LIQPAY_PRIVATE_KEY + data + process.env.LIQPAY_PRIVATE_KEY
      )
      .digest('base64')

    if (signature !== validSignature) {
      return new Response('Invalid signature', { status: 400 })
    }

    // Расшифровка данных
    const decodedData = JSON.parse(
      Buffer.from(data, 'base64').toString('utf-8')
    ) as PaymentCallbackDatat

    // Получение payment_id
    const paymentId = decodedData.payment_id
    const orderId = decodedData.order_id
    console.log('Payment ID:', paymentId, orderId, decodedData)

    const order = await prisma.order.findFirst({
      where: {
        id: Number(orderId),
      },
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' })
    }

    // Здесь можешь сохранить paymentId и статус в базу данных

    const isSucceeded = decodedData.status === 'success'

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentId.toString(),
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    })

    const items = order?.items as unknown as CartItemDTO[]

    if (isSucceeded) {
      await sendEmail(
        order.email,
        ' Next Pizza / Ваш заказ успешно оформлен 🎉',
        OrderSuccessTemplate({ orderId: order.id, items: items })
      )
    } else {
      await sendEmail(
        order.email,
        'Next Pizza / Оплата заказа #' + order.id +'отменена',
        OrderСanceledTemplate({ orderId: order.id })
      )
    }

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.error('Error in LiqPay callback:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
