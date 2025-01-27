'use client'

import React from 'react'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import NextTopLoader from 'nextjs-toploader'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'

interface ProvidersProps {
  messages: AbstractIntlMessages
  children: React.ReactNode
  locale: string
  timeZone: string
}

export const Providers: React.FC<ProvidersProps> = ({
  messages,
  children,
  locale,
  timeZone,
}) => {
  return (
    <>
      <SessionProvider>
        <NextIntlClientProvider
          messages={messages}
          locale={locale}
          timeZone={timeZone}
        >
          {children}
        </NextIntlClientProvider>
      </SessionProvider>
      <Toaster />
      <NextTopLoader />
    </>
  )
}
