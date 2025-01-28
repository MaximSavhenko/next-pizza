import React from 'react'
import { WhiteBlock } from '../white-block'
import { FormInput, FormMaskedInput } from '../form'
import { useTranslations } from 'next-intl'

interface Props {
  className?: string
}

export const CheckoutPersonalForm: React.FC<Props> = ({
  className,
}) => {
  const t = useTranslations('CartPage')
  return (
    <WhiteBlock title={t('Personal information')} className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder={t('CartForm.Name')} />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder={t('CartForm.Surname')}
        />
        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <FormMaskedInput
          name="phone"
          mask="{+38\0 }(00) 000-00-00"
          placeholder="+380 (XX) XXX-XX-XX"
          className="text-base"
        />
      </div>
    </WhiteBlock>
  )
}
