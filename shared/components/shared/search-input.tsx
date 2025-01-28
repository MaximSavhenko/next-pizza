'use client'

import { Link } from '@/i18n/routing'
import { cn } from '@/shared/lib/utils'
import { Api } from '@/shared/services/api-client'
import { Product } from '@prisma/client'
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { useRef } from 'react'
import { useClickAway, useDebounce } from 'react-use'

interface Props {
  className?: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const t = useTranslations('HomePage')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [focused, setFoicused] = React.useState(false)
  const [products, setProducts] = React.useState<Product[]>([])
  const ref = useRef(null)
  useClickAway(ref, () => {
    setFoicused(false)
  })

  useDebounce(
    async () => {
      try {
        const response = await Api.products.search(searchQuery)
        setProducts(response)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    250,
    [searchQuery]
  )

  const onClickItem = () => {
    setFoicused(false)
    setSearchQuery('')
    setProducts([])
  }


  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />
      )}
      <div
        className={cn(
          'flex rounded-2xl flex-1 justify-between relative h-11 z-30',
          className
        )}
        ref={ref}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder={`${t('Find pizza')}...`}
          value={searchQuery}
          onFocus={() => setFoicused(true)}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {products.length > 0 && (
          <div
            className={cn(
              'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
              focused && 'visible opacity-100 top-12'
            )}
          >
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="w-full flex items-center gap-3 px-3 py-3 hover:bg-primary/10 "
                onClick={onClickItem}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="rounded-sm h-8 w-8 px"
                />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
