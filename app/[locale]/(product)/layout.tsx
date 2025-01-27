import type { Metadata } from 'next'
import '../globals.css'
import { Header } from '@/shared/components/shared'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Next Pizza | Главная',
  description: 'Generated by create next app',
}

export default function ProductPageLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <main className="min-h-screen">
      <Suspense>
        <Header />
      </Suspense>
      {children}
      {modal}
    </main>
  )
}
