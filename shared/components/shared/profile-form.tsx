'use client'

import React from 'react'
import { formRegisterSchema, TFormRegisterValues } from './modals/form/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import { Container } from './container'
import { Title } from './title'
import { FormInput } from './form'
import { Button } from '../ui'
import toast from 'react-hot-toast'
import { updateUserInfo } from '@/app/actions'
import { useTranslations } from 'next-intl'

interface Props {
  className?: string
  data: User
}

export const ProfileForm: React.FC<Props> = ({ className, data }) => {
  const t = useTranslations('ProfilePage')
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      })

      toast.success(t('Data successfully changed!'), {
        icon: '✨',
      })
    } catch (error) {
      return (
        toast.error(t('Error updating data')),
        {
          icon: '⚠️',
        }
      )
    }
  }

  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
    })
  }

  return (
    <Container className="my-10">
      <Title
        text={`${t('Personal data')} | #${data.id}`}
        size="md"
        className="font-bold"
      />
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label={t('Full name')} required />

          <FormInput
            name="password"
            type="password"
            label={t('New Password')}
            required
          />

          <FormInput
            name="confirmPassword"
            type="password"
            label={t('Confirm password')}
            required
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="text-base mt-10"
            type="submit"
          >
            {t('Save')}
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            {t('Log out')}
          </Button>
        </form>
      </FormProvider>
    </Container>
  )
}
