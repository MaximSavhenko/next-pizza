import { Nunito } from 'next/font/google'
import './globals.css'
import { Providers } from '@/shared/components'
import { getMessages } from 'next-intl/server'
import { getLocale } from 'next-intl/server'


const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
})


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const messages = await getMessages()
  const locale = await getLocale()

  return (
    <html lang={locale}>
      <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
      </head>
      <body className={`${nunito.variable} antialiased`}>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
