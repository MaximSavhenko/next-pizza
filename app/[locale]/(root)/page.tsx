import {
  TopBar,
  Container,
  Title,
  Filters,
  ProductsGroupList,
  Stories,
} from '@/shared/components/shared'
import { Suspense } from 'react'
import { findPizzas, GetSearchParams } from '@/shared/lib/find-pizzas'
import { getTranslations } from 'next-intl/server'

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams
}) {
  const categories = await findPizzas(searchParams)
  const t = await getTranslations('HomePage')

  return (
    <>
      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />
      <Stories />

      <Container className="mt-10">
        <Title text={t('All pizzas')} size="lg" className="font-extrabold" />
      </Container>

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
