'use client'

import React from 'react'
import { useIntersection } from 'react-use'
import { Title } from './title'
import { cn } from '@/shared/lib/utils'
import { ProductCard } from './product-card'
import { useCategoryStore } from '@/shared/store/category'

interface Props {
  title: string
  items: any[]
  className?: string
  listClassName?: string
  categoryId: number
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  listClassName,
  className,
  categoryId,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
  const intersectionRef = React.useRef(null)
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  })
  React.useEffect(() => {
    if (intersection && intersection.isIntersecting) {
      setActiveCategoryId(categoryId)
    }
  }, [intersection?.isIntersecting, title, categoryId])
  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} className="font-extrabold mb-5" />
      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product, i) => (
          <ProductCard
            key={i}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
          />
        ))}
      </div>
    </div>
  )
}