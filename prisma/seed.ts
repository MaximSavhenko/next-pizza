import { Prisma } from '@prisma/client'
import { ingredients, categories, products } from './constants'
import { prisma } from './prisma-client'
import { hashSync } from 'bcrypt'

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10
}

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number
  pizzaType?: 1 | 2
  size?: 20 | 30 | 40
}) => {
  return {
    productId,
    price: randomNumber(60, 300),
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput
}

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User Test',
        email: 'siiigggma@gmail.com',
        password: hashSync('1111111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin Admin',
        email: 'admin@example.com',
        password: hashSync('222222', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  })

  await prisma.category.createMany({
    data: categories,
  })

  await prisma.ingredient.createMany({
    data: ingredients,
  })

  await prisma.product.createMany({
    data: products,
  })

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Pepper Jalapeño',
      imageUrl: 'https://adminbm.kharkiv.ua/uploads/DSC_09531_1dc1010755.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
    },
  })

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Bella Stracciatella',
      imageUrl: 'https://adminbm.kharkiv.ua/uploads/DSC_09573_05b9f4a940.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 15),
      },
    },
  })

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Feta Pollo',
      imageUrl: 'https://adminbm.kharkiv.ua/uploads/DSC_09556_7f4272c023.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  })

  await prisma.productItem.createMany({
    data: [
      // Пицца "Пеппер Халапеньо"
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

      // Пицца "Белла Страчателла"
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

      // Пицца "Фета Полло"
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

      // Остальные продукты
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  })

  await prisma.cart.createMany({
    data: [
      { userId: 1, totalAmount: 0, token: '111111' },
      { userId: 2, totalAmount: 0, token: '2222' },
    ],
  })

  await prisma.cartItem.create({
    data: {
      cartId: 1,
      productItemId: 1,
      quantity: 1,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  })

  const story1 = await prisma.story.create({
    data: {
      previewImageUrl: '/assets/images/storyes/storyes/50_2_4589b099c3.png',
    },
  })
  const story2 = await prisma.story.create({
    data: {
      previewImageUrl: '/assets/images/storyes/storyes/burger_2_cbffebf338.png',
    },
  })
  const story3 = await prisma.story.create({
    data: {
      previewImageUrl:
        '/assets/images/storyes/storyes/burrito_2_841f1bdaec.png',
    },
  })
  const story4 = await prisma.story.create({
    data: {
      previewImageUrl: '/assets/images/storyes/storyes/pizza_2_4bdc8dff6f.png',
    },
  })
  const story5 = await prisma.story.create({
    data: {
      previewImageUrl: '/assets/images/storyes/storyes/tacos_2_f0e8970940.png',
    },
  })
  const story6 = await prisma.story.create({
    data: {
      previewImageUrl: '/assets/images/storyes/storyes/week_2_bc66861586.png',
    },
  })

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: story1.id,
        sourceUrl: '/assets/images/storyes/storyItem/burger_3_39c0c2adf5.png',
      },
      {
        storyId: story2.id,
        sourceUrl: '/assets/images/storyes/storyItem/ua_50_3_1fd5f2d694.png',
      },
      {
        storyId: story3.id,
        sourceUrl: '/assets/images/storyes/storyItem/ua_pizza_1_afe383d33a.png',
      },
      {
        storyId: story4.id,
        sourceUrl: '/assets/images/storyes/storyItem/ua_pizza_2_9662d38b5b.png',
      },
      {
        storyId: story5.id,
        sourceUrl: '/assets/images/storyes/storyItem/ua_pizza_3_7eb2ec9008.png',
      },
      {
        storyId: story6.id,
        sourceUrl: '/assets/images/storyes/storyItem/ua_pizza_4_7f525d3a4a.png',
      },
    ],
  })
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`
}

async function main() {
  try {
    await down()
    await up()
  } catch (e) {
    console.error(e)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
