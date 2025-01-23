export const handleEnterKeyFocus = (
  e: React.KeyboardEvent<HTMLInputElement>
) => {
  if (e.key !== 'Enter') return

  e.preventDefault()

  const form = e.currentTarget.form
  if (!form) return

  const elements = Array.from(form.elements).filter(
    (el): el is HTMLInputElement => el instanceof HTMLInputElement
  )

  const currentIndex = elements.indexOf(e.currentTarget as HTMLInputElement)
  const nextInput = elements[currentIndex + 1]

  nextInput?.focus()
}
