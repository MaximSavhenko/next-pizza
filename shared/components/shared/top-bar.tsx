import React from 'react'
import { cn } from '@/shared/lib/utils'
import { Categories, SortPopup, Container, CartButton } from '@/shared/components/shared'
import { Category } from '@prisma/client'

interface Props {
  categories: Category[]
  className?: string
}

export const TopBar: React.FC<Props> = ({ className, categories }) => {
  return (
    <div
      className={cn(
        'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10 scroll-m-20',
        className
      )}
    >
      <Container className="flex items-center justify-between ">
        <Categories items={categories} />
        {/* <SortPopup /> */}
        <CartButton />
      </Container>
    </div>
  )
}
