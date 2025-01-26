import { useSession } from 'next-auth/react'
import React from 'react'
import { Button } from '../ui'
import { CircleUser, User } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

interface Props {
  onClickSignIn?: () => void
  className?: string
}

export const ProfileButton: React.FC<Props> = ({
  className,
  onClickSignIn,
}) => {
  const { data: session } = useSession()
  const t = useTranslations('HomePage');

  return (
    <div className={className}>
      {!session ? (
        <Button
          onClick={onClickSignIn}
          variant="outline"
          className="flex items-center gap-1"
        >
          <User size={16} />
          Войти
        </Button>
      ) : (
        <Link href={'/profile'}>
          <Button
            variant="secondary"
            className="flex items-center gap-2"
          >
            <CircleUser size={16} />
            {t('Profile')}
          </Button>
        </Link>
      )}
    </div>
  )
}
