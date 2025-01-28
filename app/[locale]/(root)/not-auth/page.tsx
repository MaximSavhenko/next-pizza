import { InfoBlock } from '@/shared/components'
import { useTranslations } from 'next-intl'

export default function UnauthorizedPage() {
  const t = useTranslations('UnauthorizedPage')
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title={t('Access Denied')}
        text={t('This page can only be viewed by authorized users')}
        imageUrl="/assets/images/lock.png"
      />
    </div>
  )
}
