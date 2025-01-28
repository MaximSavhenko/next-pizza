import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { TFormLoginValues } from './schemas'
import { Title } from '../../title'
import { FormInput } from '../../form'
import { Button } from '@/shared/components/ui'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'

interface Props {
  className?: string
  onClose?: () => void
}

export const LoginForm: React.FC<Props> = ({ className, onClose }) => {
  const form = useForm<TFormLoginValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const t = useTranslations('HomePage')

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn('credentials', {
        ...data,
        redirect: false,
      })
      if (!resp?.ok) {
        throw Error()
      }

      toast.success(
        t('AuthModal.You have successfully logged into your account'),
        {
          icon: '😊',
        }
      )

      onClose?.()
    } catch (error) {
      console.log('Error [LOGIN]', error)
      toast.error(t('AuthModal.Failed to log into your account'), {
        icon: '⚠️',
      })
    }
  }

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5 "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title
              text={t('AuthModal.Login to your account')}
              size="md"
              className="font-bold"
            />
            <p className="text-gray-400">
              {t('AuthModal.Enter your email to log into your account')}
            </p>
          </div>
          <img
            src="/assets/images/phone-icon.png"
            alt="phone-icon"
            width={60}
            height={60}
          />
        </div>

        <FormInput name="email" label="E-mail" required />
        <FormInput
          name="password"
          label={t('AuthModal.Password')}
          type="password"
          required
        />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          {t('Login')}
        </Button>
      </form>
    </FormProvider>
  )
}
