import React from 'react'

interface InputProps {
  placeholder?: string
  value?: string
  type?: string
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input : React.FC<InputProps> = ({
  placeholder,
  value,
  type,
  disabled,
  onChange
}) => {
  return (
    <input disabled={disabled} onChange={onChange} value={value} placeholder={placeholder} type={type} className='rounded-2xl p-4 text-lg border focus:bg-zinc-100 transition disabled:opacity-70 disabled:cursor-not-allowed' />
  )
}

export default Input