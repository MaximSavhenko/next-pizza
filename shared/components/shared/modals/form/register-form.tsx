'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { registerUser } from '@/app/actions';
import { TFormRegisterValues, formRegisterSchema } from './schemas';
import { FormInput } from '@/shared/components';
import { Button } from '@/shared/components/ui';
import { useTranslations } from 'next-intl';

interface Props {
  onClose?: VoidFunction;
  onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose, onClickLogin }) => {
  const t = useTranslations('HomePage')
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error(t('AuthModal.Registration successfulConfirm your email'), {
        icon: '✅',
      });

      onClose?.();
    } catch (error) {
      return toast.error(t('AuthModal.Incorrect email or password'), {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label={t('AuthModal.Full name')} required />
        <FormInput name="password" label={t('AuthModal.Password')} type="password" required />
        <FormInput name="confirmPassword" label={t('AuthModal.Confirm password')} type="password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          {t('AuthModal.Register')}
        </Button>
      </form>
    </FormProvider>
  );
};