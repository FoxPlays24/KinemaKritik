import swr from 'swr'
import fetcher from './fetcher.ts'

export const getFilm = (filmId: number) => {
  const { data, error, isLoading, mutate } = swr(`${process.env.REACT_APP_API_URL}/films/${filmId}`, fetcher)
  return {
    data,
    error,
    isLoading,
    mutate
  }
}

export const getGenres = (filmId: number) => {
  const { data, error, isLoading, mutate } = swr(`${process.env.REACT_APP_API_URL}/films/${filmId}/genres`, fetcher)
  return {
    data,
    error,
    isLoading,
    mutate
  }
}

export const getFilms = () => {
  const { data, error, isLoading, mutate } = swr(`${process.env.REACT_APP_API_URL}/films/`, fetcher)
  return {
    data,
    error,
    isLoading,
    mutate
  }
}

export const getFilmLikes = (filmId: number) => {
  const { data, mutate } = swr(`${process.env.REACT_APP_API_URL}/films/${filmId}/likes`, fetcher)
  return { data, mutate }
}

export const getFilmLiked = (filmId: number, userId: number) => {
  const { data, mutate } = swr(`${process.env.REACT_APP_API_URL}/films/${filmId}/liked/${userId}`, fetcher)
  return { data, mutate }
}