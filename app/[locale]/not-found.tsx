import { Header, InfoBlock } from '@/shared/components'
import { Suspense } from 'react'

export default function UnauthorizedPage() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <div className="flex flex-col items-center justify-center mt-40">
        <InfoBlock
          title="Страница не найдена"
          text="Проверьте корректность введённого адреса или повторите попытку позже"
          imageUrl="/assets/images/not-found.png"
        />
      </div>
    </>
  )
}
