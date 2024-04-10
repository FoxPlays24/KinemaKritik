import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import { getUser } from '../../api/users.ts'
import { useEditModal } from '../../hooks/useEditModal.ts'
import axios from 'axios'
import toast from 'react-hot-toast'
import Modal from '../Modal.tsx'
import Input from '../modalComponents/Input.tsx'
import { ImageUpload } from '../ImageUpload.tsx'

const EditModal = () => {
  const { currentUser } = useContext(AuthContext)
  
  const { data: user, mutate: mutateUser } = getUser(currentUser?.login)
  const editModal = useEditModal()
  
  const [profileImage, setProfileImage] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState('')
  
  useEffect(() => {
    setProfileImage(user?.profile_image)
    setCoverImage(user?.cover_image)
    setUsername(user?.username)
    setStatus(user?.status)
  }, [user])
  
  const [isLoading, setIsLoading] = useState(false)
  
  const onSubmit = useCallback(async (currentUserId) => {
    try {
      setIsLoading(true)

      await axios.patch('http://localhost:80/users/edit', {
        user_id: currentUserId,
        profile_image: profileImage,
        cover_image: coverImage,
        username: username,
        status: status
      })
      mutateUser()
      toast.success('Информация о пользователе обновлена!')

      editModal.onClose()
    } catch (err) {
        toast.error('Возникла ошибка при обновлении данных')
    } finally {
        setIsLoading(false)
    }
  }, [coverImage, editModal, mutateUser, profileImage, status, username])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <ImageUpload value={profileImage} disabled={isLoading} onChange={(image) => setProfileImage(image)} label='Изображение профиля' />
      <ImageUpload value={coverImage} disabled={isLoading} onChange={(image) => setCoverImage(image)} label='Изображение шапки' />
      <Input name='username'
        placeholder='Псевдоним'
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input name='status'
        placeholder='Статус'
        onChange={(e) => setStatus(e.target.value)}
        value={status}
        disabled={isLoading}
      />
    </div>
  )
  
  return (
  <Modal disabled={isLoading} isOpen={editModal.isOpen} title='Редактирование профиля' actionLabel='Сохранить' onClose={editModal.onClose} onSubmit={() => onSubmit(currentUser?.id)} body={bodyContent} />
  )
}

export default EditModal