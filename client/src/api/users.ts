import swr from 'swr'
import fetcher from './fetcher.ts'

const getUser = (userLogin: string) => {
  const { data, error, isLoading, mutate } = swr(`http://localhost:80/users/${userLogin}`, fetcher)
  return {
    data,
    error,
    isLoading,
    mutate
  }
}

export { getUser }