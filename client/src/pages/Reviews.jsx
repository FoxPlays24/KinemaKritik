import { getReviews } from '../api/reviews.ts'
import Header from '../components/Header.tsx'
import Review from '../components/Review.tsx'

const Reviews = () => {
  const { data: reviews, isReviewsLoading } = getReviews()

  if (isReviewsLoading || !reviews) {
    return (
    <>
    Загрузка
    </>
    )
  }

  return (
  <div className='flex flex-col gap-6'>
    <Header label='Рецензии' label2='Все рецензии на кино' />
    <h2 className='text-center'>Здесь показаны все рецензии на <b className='font-semibold text-red-600'>КинемаКритик!</b></h2>
    {
      reviews.length > 0 ?
      <div className='flex flex-col gap-4 mb-16'>
        {reviews.map(review => (
            <Review review={review} />
        ))}
      </div>
      :
      <span className='flex justify-center select-none'>Рецензий пока нет... :(</span>
    }
  </div>
  )
}

export default Reviews