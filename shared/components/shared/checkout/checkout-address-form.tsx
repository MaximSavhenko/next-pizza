'use client'

import React from 'react'
import { WhiteBlock } from '../white-block'
import { FormTextarea } from '../form'
import { AddressInput } from '../address-input'
import { Controller, useFormContext } from 'react-hook-form'
import { ErrorText } from '../error-text'
import { useTranslations } from 'next-intl'

interface Props {
  className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext()
  const t = useTranslations('CartPage')
  return (
    <WhiteBlock title={t('Delivery address')} className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} />
              )}
            </>
          )}
        />
        <FormTextarea
          name="comment"
          rows={5}
          className="text-base"
          placeholder={t('CartForm.Comment to order')}
        />
      </div>
    </WhiteBlock>
  )
}
