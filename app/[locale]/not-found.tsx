import { Header, InfoBlock } from '@/shared/components'
import { useTranslations } from 'next-intl'
import { Suspense } from 'react'

export default function UnauthorizedPage() {
  const t = useTranslations('404')
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <div className="flex flex-col items-center justify-center mt-40">
        <InfoBlock
          title={t('Page not found')}
          text={t('Please check the address you entered is correct or try again later')}
          imageUrl="/assets/images/not-found.png"
        />
      </div>
    </>
  )
}
