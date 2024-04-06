interface ButtonProps {
  label: string
  secondary?: boolean
  fullWidth?: boolean
  large?: boolean
  onClick: () => void
  disabled?: boolean
  outline?: boolean
}

const Button : React.FC<ButtonProps> = ({
  label,
  secondary,
  fullWidth,
  large,
  onClick,
  disabled,
  outline
}) => {
  return (
    <button disabled={disabled} onClick={onClick}
    className={`rounded-2xl border transition hover:opacity-80
    ${fullWidth ? 'w-full' : 'w-fit'}
    ${secondary ? 'bg-white text-black border-black' : 'bg-red-500 text-white border-red-800'}
    ${large ? 'text-xl px-5 py-3' : 'text-md px-4 py-2'}
    ${outline ? 'bg-transparent border-white text-white' : ''}
    `}>
      {label}
    </button>
  )
}

export default Button