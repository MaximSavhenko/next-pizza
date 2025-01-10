import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { findOrCreateCart, updateCartTotalAmount } from '@/shared/lib'
import { CreateCartItemValue } from '@/shared/services/dto/cart.dto'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] })
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    })

    return NextResponse.json(userCart)
  } catch (error) {
    console.error('[CART_GET] Server error', error)
    return NextResponse.json(
      { message: 'Не удалось получить корзину' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value

    if (!token) {
      token = crypto.randomUUID()
    }

    const userCart = await findOrCreateCart(token)

    const data = (await req.json()) as CreateCartItemValue

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
      },
      include: {
        ingredients: true,
      },
    })

    // Проверяем совпадение ингредиентов как точные множества
    const ingredientsMatch =
      findCartItem &&
      findCartItem.ingredients.length === data.ingredients?.length &&
      findCartItem.ingredients.every((ingredient) =>
        data.ingredients?.includes(ingredient.id)
      )

    // если товар был найден(в корзине пользователя), делаем + 1
    if (ingredientsMatch) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      })
    } else {
      // если товар не был найден(в корзине пользователя), добавляем его
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: {
            connect: data.ingredients?.map((id) => ({ id })),
          },
        },
      })
    }

    const updateUserCart = await updateCartTotalAmount(token)
    const resp = NextResponse.json(updateUserCart)
    resp.cookies.set('cartToken', token)
    return resp
  } catch (error) {
    console.error('[CART_POST] Server error', error)
    return NextResponse.json(
      { message: 'Не удалось создать корзину' },
      { status: 500 }
    )
  }
}
