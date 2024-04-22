import swr from 'swr'
import fetcher from './fetcher.ts'

export const getReviews = (filmId?: number) => {
  const { data, error, isLoading, mutate } = swr(filmId ? `http://localhost:3001/films/${filmId}/reviews` : 'http://localhost:3001/review', fetcher)
  return {
    data,
    error,
    isLoading,
    mutate
  }
}

export const getUserReview = (filmId: number, userId: number) => {
  const { data, error, isLoading, mutate } = swr(`http://localhost:3001/films/${filmId}/review/${userId}`, fetcher)
  return {
    data,
    error,
    isLoading,
    mutate
  }
}

export const getUserReviews = (userLogin: string) => {
  const { data, error, isLoading, mutate } = swr(`http://localhost:3001/review/${userLogin}`, fetcher)
  return {
    data,
    error,
    isLoading,
    mutate
  }
}

export const getReviewLikes = (reviewId: number) => {
  const { data, mutate } = swr(`http://localhost:3001/review/${reviewId}/likes`, fetcher)
  return { data, mutate }
}

export const getReviewLiked = (reviewId: number, userId: number) => {
  const { data, mutate } = swr(`http://localhost:3001/review/${reviewId}/liked/${userId}`, fetcher)
  return { data, mutate }
}