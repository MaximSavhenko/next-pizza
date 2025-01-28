'use client'

import React from 'react'
import { Title } from './title'
import { Input } from '../ui'
import { RangeSlider } from './range-slider'
import { CheckboxFiltersGroup } from './checkbox-filters-group'
import { useQueryFilters, useFilters, useIngredients } from '@/shared/hooks'
import { useTranslations } from 'next-intl'

interface Props {
  className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
  const t = useTranslations('HomePage.Filter')
  const { ingredients, loading } = useIngredients()
  const filters = useFilters()

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0])
    filters.setPrices('priceTo', prices[1])
  }

  useQueryFilters(filters)

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }))

  return (
    <div className="{className}">
      <Title text={t('Filtration')} size="sm" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        title={t('Test type')}
        name="pizzaTypes"
        className="mt-5"
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: 'Thin', value: '1' },
          { text: 'Traditional', value: '2' },
        ]}
      />

      <CheckboxFiltersGroup
        title={t('Dimensions')}
        name="pizzaSizes"
        className="mt-5"
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: '20sm', value: '20' },
          { text: '30sm', value: '30' },
          { text: '40sm', value: '40' },
        ]}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">{t('Price from and to')}:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom || 0)}
            onChange={(e) =>
              filters.setPrices('priceFrom', Number(e.target.value))
            }
          />
          <Input
            type="number"
            placeholder="1000"
            min={0}
            max={1000}
            value={String(filters.prices.priceTo || 1000)}
            onChange={(e) =>
              filters.setPrices('priceTo', Number(e.target.value))
            }
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 1000,
          ]}
          onValueChange={updatePrices}
        />
      </div>

      <CheckboxFiltersGroup
        title={t('Ingredients')}
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredient}
        selected={filters.selectedIngredients}
        name="ingredients"
      />
    </div>
  )
}
