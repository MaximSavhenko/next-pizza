'use client'

import React from 'react'
import { Input } from '../../ui'
import { cn } from '@/shared/lib/utils'
import { RequiredSymbol } from '../required-symbol'
import { ErrorText } from '../error-text'
import { ClearButton } from '../clear-button'
import { useFormContext } from 'react-hook-form'
import { handleEnterKeyFocus } from '@/shared/lib'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  required?: boolean
  className?: string
}

export const FormInput: React.FC<Props> = ({
  label,
  name,
  required,
  className,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()

  const value = watch(name)
  const errorText = errors[name]?.message as string
  const handleClear = () => setValue(name, '', { shouldValidate: true })

  return (
    <div className={cn('', className)}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input
          {...props}
          {...register(name)}
          className="text-md h-12"
          onKeyDown={handleEnterKeyFocus}
        />
        {value && <ClearButton onClick={handleClear} />}
      </div>
      {errorText && <ErrorText text={errorText} className="mb-2" />}
    </div>
  )
}
