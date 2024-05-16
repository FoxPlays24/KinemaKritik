"use client"

import { bufferToBase64 } from "@/utils/strings"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

export enum ImageUploadType {
  COVER  = "cover",
  PROFILE = "profile"
}

interface ImageUploadProps {
  disabled: boolean,
  onChange: (base64: string) => void,
  value: string,
  type: ImageUploadType.COVER | ImageUploadType.PROFILE
}

export function ImageUpload({ disabled, onChange, value, type }: ImageUploadProps) {
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

  const { getRootProps, getInputProps, open } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    noClick: type === ImageUploadType.COVER,
    accept: {
      'image/jpeg': [],
      'image/png':  []
    }
  })

  function handleRemoveCover() {
    setBase64("")
    onChange("")
  }

  return (
    <div {...getRootProps({ className: 
      type === ImageUploadType.PROFILE ? "relative flex items-center justify-center -mt-12 group cursor-pointer" 
      : type === ImageUploadType.COVER ? "relative flex items-center justify-center" : ""
    })}>
      <input {...getInputProps()} />
      {
        type === ImageUploadType.PROFILE ?
        <>
          <Upload className="absolute z-10 options-button group-hover:scale-110 group-hover:bg-slate-700/80" />
          <Image src={bufferToBase64(base64)||"/placeholders/profile.png"} alt="Profile picture" width={200} height={200}
            className="size-32 rounded-2xl border-2 border-white brightness-75" />
        </>
        : type === ImageUploadType.COVER ?
        <>
        <div className="absolute z-10 flex gap-6">
          <button onClick={open}><Upload className="options-button" /></button>
          <button onClick={handleRemoveCover}><X className="options-button z-20" /></button>
        </div>
        {
          base64 ?
          <Image src={bufferToBase64(base64)||""} alt="Cover image" width={0} height={0}
            className="w-full h-52 rounded-2xl object-cover brightness-75" />
          : <div className="w-full h-52 rounded-2xl bg-slate-300 brightness-75" />
        }
        </> : <></>
      }
    </div>
  )
}