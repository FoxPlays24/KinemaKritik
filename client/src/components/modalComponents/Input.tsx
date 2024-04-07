import React from 'react'

interface InputProps {
  name: string
  placeholder?: string
  value?: string
  type?: string
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input : React.FC<InputProps> = ({
  name,
  placeholder,
  value,
  type,
  disabled,
  onChange
}) => {
  return (
    <input disabled={disabled} onChange={onChange} name={name} value={value} placeholder={placeholder} type={type} className='rounded-2xl p-4 text-lg border focus:bg-zinc-100 transition disabled:opacity-70 disabled:cursor-not-allowed' />
  )
}

export default Input