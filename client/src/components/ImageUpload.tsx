import React, { useCallback, useState } from "react"
import { useDropzone } from 'react-dropzone'

import { Buffer } from 'buffer'

interface ImageUploadProps {
  onChange: (base64: string) => void
  label: string
  value?: string
  disabled?: boolean
}

export const bufferToBase64 = (buffer: string, placeholder?: string) => {
    return buffer ? Buffer.from(buffer).toString() : placeholder
}

export const ImageUpload : React.FC<ImageUploadProps> = ({
  onChange,
  label,
  value,
  disabled
}) => {
  const [base64, setBase64] = useState(value)

  const handleChange = useCallback((base64: string) => {
    onChange(base64)
  }, [onChange])

  const handleDrop = useCallback((files: any) => {
    const file = files[0]
    const reader = new FileReader()

    reader.onload = (e: any) => {
        setBase64(e.target.result)
        handleChange(e.target.result)
    }

    reader.readAsDataURL(file)
  }, [handleChange])

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      'image/jpeg': [],
      'image/png': []
    }
  })

  return (
  <div {...getRootProps({ className: 'w-full p-4 border-2 border-dotted' })}>
    <input {...getInputProps()} />
    {
      base64 ? (
        <div className='flex items-center justify-center'>
          <img src={bufferToBase64(base64)} alt='Загруженное изображение' width='100' height='100' />
        </div>
      ) : (
        <p className="select-none">{label}</p>
      )
    }
  </div>
  )
}