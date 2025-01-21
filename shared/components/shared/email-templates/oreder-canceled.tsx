import React from 'react'

interface Props {
  orderId: number
}

export const OrderСanceledTemplate: React.FC<Props> = ({ orderId }) => (
  <div>
    <h1>Простите, ваш заказ #{orderId} отменён из-за отсутствия оплаты. 🍕💔</h1>
  </div>
)
