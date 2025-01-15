'use client'

import { useAddressSearch } from '@/shared/hooks'
import React, { useEffect, useRef } from 'react'
import { Input } from '../ui'
import { cn } from '@/shared/lib/utils'

interface Props {
  className?: string
  onChange?: (value: string) => void // Обязательно передаем onChange
}

export const AddressInput: React.FC<Props> = ({ className, onChange }) => {
  const [query, setQuery] = React.useState('')
  const [isDropdownVisible, setDropdownVisible] = React.useState(false)
  const { data, loading, error } = useAddressSearch({
    query,
    city: 'circle:49.9935,36.2304;r=30000',
    language: 'uk-UA',
  })

  const dropdownRef = useRef<HTMLUListElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setDropdownVisible(true) // Показываем список при вводе текста
    onChange?.(value) // Вызываем переданный onChange
  }

  // Закрытие выпадающего списка при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false) 
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative">
      <Input
        name="address"
        ref={inputRef}
        className={cn('text-base h-12', className)}
        placeholder="Введите адрес..."
        value={query}
        onChange={handleInputChange}
      />
      {isDropdownVisible && (
        <ul
          ref={dropdownRef}
          className="absolute left-0 right-0 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-10"
        >
          {/* Загрузка */}
          {loading && (
            <li className="py-2 px-3 text-center text-gray-500">Загрузка...</li>
          )}

          {/* Ошибка */}
          {error && (
            <li className="py-2 px-3 text-center text-red-500">
              Ошибка загрузки
            </li>
          )}

          {/* Нет данных */}
          {!loading && !data?.length && query && (
            <li className="py-2 px-3 text-center text-gray-400">
              Ничего не найдено
            </li>
          )}

          {/* Рендеринг адресов */}
          {data &&
            data.map((item) => (
              <li
                key={item.title}
                className="address-dropdown-item py-2 px-3 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setQuery(item.title) 
                  setDropdownVisible(false) 
                  onChange?.(item.title) 
                }}
              >
                {item.title}
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
