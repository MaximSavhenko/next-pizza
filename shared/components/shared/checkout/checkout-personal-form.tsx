import React from 'react'
import { WhiteBlock } from '../white-block'
import { FormInput, FormMaskedInput } from '../form'

interface Props {
  className?: string
}

export const CheckoutPersonalForm: React.FC<Props> = ({
  className,
}) => {
  return (
    <WhiteBlock title="2. Персональная информация" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder="Имя" />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="Фамилия"
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
