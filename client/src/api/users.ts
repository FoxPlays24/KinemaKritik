import swr from 'swr'
import fetcher from './fetcher.ts'

const getUser = (userLogin: string) => {
  const { data, error, isLoading, mutate } = swr(`${process.env.REACT_APP_API_URL}/users/${userLogin}`, fetcher)
  return {
    data,
    error,
    isLoading,
    mutate
  }
}

export { getUser }