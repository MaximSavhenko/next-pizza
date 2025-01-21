import axios from 'axios'
import { LiqPayRequest } from './../../@types/liqpay'
import { generateSignature } from './liq-pay-signature'

interface Props {
  orderId: number
  amount: number
}
export async function generateLiqPayLink(details: Props) {
  const publicKey = process.env.LIQPAY_PUBLIC_KEY
  const privateKey = process.env.LIQPAY_PRIVATE_KEY

  if (!privateKey || !publicKey) {
    throw new Error('LiqPay keys are not set in environment variables')
  }

  const params: LiqPayRequest = {
    public_key: publicKey,
    action: 'pay',
    amount: details.amount,
    currency: 'UAH',
    description: `Оплата заказа #${details.orderId}`,
    order_id: details.orderId,
    version: 3,
    result_url: process.env.LIQPAY_CALLBACK_URL,
    server_url: process.env.LIQPAY_SERVER_URL,
  }

  const dataString = JSON.stringify(params)

  const dataEncoded = Buffer.from(dataString).toString('base64')
  const signature = generateSignature(dataEncoded)
  const checkoutUrl = `https://www.liqpay.ua/api/checkout?data=${dataEncoded}&signature=${signature}`
  return {
    checkoutUrl,
  }
}
