'use client'

import React from 'react'
import { IMask, IMaskInput } from 'react-imask'
import { Controller, useFormContext } from 'react-hook-form'
import { ErrorText } from '../error-text'
import { cn } from '@/shared/lib/utils'
import { ClearButton } from '../clear-button'
import { handleEnterKeyFocus } from '@/shared/lib'

interface FormMaskedInputProps {
  name: string
  mask: string
  placeholder?: string
  required?: boolean
  className?: string
}

export const FormMaskedInput: React.FC<FormMaskedInputProps> = ({
  name,
  mask,
  placeholder,
  required,
  className,
}) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field: { onChange, value }, fieldState }) => (
        <div className={cn('', className)}>
          <div className="relative">
            <IMaskInput
              mask={mask}
              blocks={{
                '0': { mask: IMask.MaskedRange, from: 0, to: 9 },
              }}
              value={value}
              unmask={false}
              onAccept={(maskedValue: string) => {
                onChange(maskedValue)
              }}
              placeholder={placeholder}
              onKeyDown={handleEnterKeyFocus}
              className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            {value && <ClearButton onClick={() => onChange('')} />}
          </div>
          {fieldState.error?.message && (
            <ErrorText text={fieldState.error.message} />
          )}
        </div>
      )}
    />
  )
}
