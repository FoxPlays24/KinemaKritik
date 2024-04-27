import { useLocation } from 'react-router-dom'
import Header from '../components/Header.tsx'
import { getReviews } from '../api/reviews.ts'

const Reviews = () => {
  const reviewId = parseInt(useLocation().pathname.split("/")[2])
  const { data: review, isReviewLoading } = getReviews(reviewId)

  return (
  <>
  <Header showBackArrow={true} label={`Рецензия #${reviewId}`} label2='Рецензия на кино' />
  
  </>
  )
}

export default Reviews