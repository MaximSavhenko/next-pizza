import { redirect } from '@/i18n/routing'
import { prisma } from '@/prisma/prisma-client'
import { ProfileForm } from '@/shared/components'
import { getUserSession } from '@/shared/lib/get-user-session'
import { getLocale } from 'next-intl/server'
// import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const locale = await getLocale()  
  const session = await getUserSession()

  if (!session) {
    return redirect({ href: '/not-auth', locale })
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session?.id)
    },
  })

  if (!user) {
    return redirect({ href: '/not-auth', locale })
  }

  return <ProfileForm data={user} />
}
