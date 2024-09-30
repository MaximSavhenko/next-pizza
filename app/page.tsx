import { TopBar, Container, Title } from '@/components/shared'

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />
      <div style={{height: '2000px'}}></div>
    </>
  )
}