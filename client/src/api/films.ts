import swr from 'swr'
import { fetcherGet } from './fetcher.ts'

const getFilm = (filmId: number) => {
  const { data, error, isLoading, mutate } = swr(`http://localhost:80/films/${filmId}`, fetcherGet)
  return {
    data,
    error,
    isLoading,
    mutate
  }
}

const getGenres = (filmId: number) => {
  const { data, error, isLoading, mutate } = swr(`http://localhost:80/films/${filmId}/genres`, fetcherGet)
  return {
    data,
    error,
    isLoading,
    mutate
  }
}

const getFilms = () => {
  const { data, error, isLoading, mutate } = swr('http://localhost:80/films/', fetcherGet)
  return {
    data,
    error,
    isLoading,
    mutate
  }
}


export { getFilm, getGenres, getFilms }