import {
  TopBar,
  Container,
  Title,
  Filters,
  ProductsGroupList,
} from '@/components/shared'

export default function Home() {

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title={'Пиццы'}
                items={[
                  {
                    id: 1324,
                    name: 'Сырный цыпленок',
                    imageUrl:
                      'https://adminbm.kharkiv.ua/uploads/DSC_09546_3fcd539887.webp',
                    price: 250,
                    items: [{ price: 250 }],
                  },
                  {
                    id: 2,
                    name: 'Сырный цыпленок',
                    imageUrl:
                      'https://adminbm.kharkiv.ua/uploads/DSC_09546_3fcd539887.webp',
                    price: 250,
                    items: [{ price: 250 }],
                  },
                  {
                    id: 3,
                    name: 'Сырный цыпленок',
                    imageUrl:
                      'https://adminbm.kharkiv.ua/uploads/DSC_09546_3fcd539887.webp',
                    price: 250,
                    items: [{ price: 250 }],
                  },
                  {
                    id: 4,
                    name: 'Сырный цыпленок',
                    imageUrl:
                      'https://adminbm.kharkiv.ua/uploads/DSC_09546_3fcd539887.webp',
                    price: 250,
                    items: [{ price: 250 }],
                  },
                  {
                    id: 5,
                    name: 'Сырный цыпленок',
                    imageUrl:
                      'https://adminbm.kharkiv.ua/uploads/DSC_09546_3fcd539887.webp',
                    price: 250,
                    items: [{ price: 250 }],
                  },
                  {
                    id: 6,
                    name: 'Сырный цыпленок',
                    imageUrl:
                      'https://adminbm.kharkiv.ua/uploads/DSC_09546_3fcd539887.webp',
                    price: 250,
                    items: [{ price: 250 }],
                  },
                ]}
                categoryId={1}
              />
              <ProductsGroupList
                title={'Комбо'}
                items={[
                  {
                    id: 1324,
                    name: 'Сырный цыпленок',
                    imageUrl:
                      'https://adminbm.kharkiv.ua/uploads/DSC_09546_3fcd539887.webp',
                    price: 250,
                    items: [{ price: 250 }],
                  },
                  {
                    id: 2,
                    name: 'Сырный цыпленок',
                    imageUrl:
                      'https://adminbm.kharkiv.ua/uploads/DSC_09546_3fcd539887.webp',
                    price: 250,
                    items: [{ price: 250 }],
                  },
                  {
                    id: 3,
                    name: 'Сырный цыпленок',
                    imageUrl:
                      'https://adminbm.kharkiv.ua/uploads/DSC_09546_3fcd539887.webp',
                    price: 250,
                    items: [{ price: 250 }],
                  },
                  {
                    id: 4,
                    name: 'Сырный цыпленок',
                    imageUrl:
                      'https://adminbm.kharkiv.ua/uploads/DSC_09546_3fcd539887.webp',
                    price: 250,
                    items: [{ price: 250 }],
                  },
                  {
                    id: 5,
                    name: 'Сырный цыпленок',
                    imageUrl:
                      'https://adminbm.kharkiv.ua/uploads/DSC_09546_3fcd539887.webp',
                    price: 250,
                    items: [{ price: 250 }],
                  },
                  {
                    id: 6,
                    name: 'Сырный цыпленок',
                    imageUrl:
                      'https://adminbm.kharkiv.ua/uploads/DSC_09546_3fcd539887.webp',
                    price: 250,
                    items: [{ price: 250 }],
                  },
                ]}
                categoryId={2}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
