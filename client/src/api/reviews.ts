import swr from 'swr'
import fetcher from './fetcher.ts'

export const getReviews = (filmId?: number) => {
  const { data, error, isLoading, mutate } = swr(filmId ? `${process.env.REACT_APP_API_URL}/films/${filmId}/reviews` : `${process.env.REACT_APP_API_URL}/review`, fetcher)
  return {
    data,
    error,
    isLoading,
    mutate
  }
}

export const getUserReview = (filmId: number, userId: number) => {
  const { data, error, isLoading, mutate } = swr(`${process.env.REACT_APP_API_URL}/films/${filmId}/review/${userId}`, fetcher)
  return {
    data,
    error,
    isLoading,
    mutate
  }
}

export const getUserReviews = (userLogin: string) => {
  const { data, error, isLoading, mutate } = swr(`${process.env.REACT_APP_API_URL}/review/${userLogin}`, fetcher)
  return {
    data,
    error,
    isLoading,
    mutate
  }
}

export const getReviewLikes = (reviewId: number) => {
  const { data, mutate } = swr(`${process.env.REACT_APP_API_URL}/review/${reviewId}/likes`, fetcher)
  return { data, mutate }
}

export const getReviewLiked = (reviewId: number, userId: number) => {
  const { data, mutate } = swr(`${process.env.REACT_APP_API_URL}/review/${reviewId}/liked/${userId}`, fetcher)
  return { data, mutate }
}