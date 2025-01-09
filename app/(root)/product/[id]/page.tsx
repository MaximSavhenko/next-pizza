import {
  Container,
  GroupVariants,
  PizzaImage,
  Title,
} from '@/shared/components/shared'
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } })

  if (!product) {
    return notFound()
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <PizzaImage imageUrl={product.imageUrl} className="" size={40} />

        <div className="w-[490px] bg-[#FFF7EE] p-7">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            quam repudiandae omnis blanditiis quis deserunt optio consequatur
            ratione quibusdam fugit nostrum adipisci, molestiae, ab placeat,
            dicta sit nemo rem dolorem!
          </p>
          <GroupVariants
            value="2"
            items={[
              {
                name: 'Маленькая',
                value: '1',
              },
              {
                name: 'Средняя',
                value: '2',
              },
              {
                name: 'Большая',
                value: '3',
              },
            ]}
          />
        </div>
      </div>
    </Container>
  )
}
