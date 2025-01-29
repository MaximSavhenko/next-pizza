'use client'

import React from 'react'
import { cn } from '@/shared/lib/utils'
import { Container } from './container'
import Image from 'next/image'
import Link from 'next/link'
import { SearchInput } from './search-input'
import { CartButton } from './cart-button'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { ProfileButton } from './profile-button'
import { AuthModal } from './modals/auth-modal'
import { LanguageButtons } from './language-buttons'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'

interface Props {
  hasSearch?: boolean
  hasCart?: boolean
  className?: string
}

export const Header: React.FC<Props> = ({
  className,
  hasSearch = true,
  hasCart = true,
}) => {
  const t = useTranslations('HomePage')
  const router = useRouter()
  const [openAuthModal, setOpenAuthModal] = React.useState(false)
  const searchParams = useSearchParams()

  // Показываем уведомление об успешной оплате заказа
  React.useEffect(() => {
    let tostMessage = ''

    if (searchParams.has('paid')) {
      tostMessage =
        t('Your order has been successfully paid! Information has been sent to your email')
    }

    if (searchParams.has('verified')) {
      tostMessage = t('Email successfully verified')
    }

    if (tostMessage) {
      setTimeout(() => {
        router.replace('/')
        toast.success(tostMessage, {
          duration: 5000,
        })
      }, 0)
    }
  }, [])

  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть */}

        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                I need your clothes, your boots, and your motorcycle
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          {hasCart && <CartButton />}
          <LanguageButtons />
        </div>
      </Container>
    </header>
  )
}
