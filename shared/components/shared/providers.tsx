'use client'

import React from 'react'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import NextTopLoader from 'nextjs-toploader'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'

interface ProvidersProps {
  messages: AbstractIntlMessages// Или конкретный тип, если известен
  children: React.ReactNode
  locale: string
}

export const Providers: React.FC<ProvidersProps> = ({
  messages,
  children,
  locale,
}) => {
  return (
    <>
      <SessionProvider>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </SessionProvider>
      <Toaster />
      <NextTopLoader />
    </>
  )
}
