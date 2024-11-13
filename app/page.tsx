import { TopBar, Container, Title, Filters, ProductCard } from '@/components/shared'

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          <div className="w-[250px]">
            <Filters/>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductCard id={0} name={'Сырный цыпленок'} price={200} imageUrl={'https://adminbm.kharkiv.ua/uploads/DSC_09546_3fcd539887.webp'} />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
