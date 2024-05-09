import { ReviewPost } from "../post/ReviewPost"

export async function Reviews({ filmLink }: { filmLink: string }) {
  const reviews = await fetch(`${process.env.API_URL}/reviews?film=${filmLink}`).then(res => res.json())

  return (
    <div className="flex flex-col gap-4 divide-slate-300">
      <h2 className="text-xl font-semibold">Рецензии</h2>
      <hr />
      <div className="flex items-center select-none">
        <button className="button">Оценить</button>
        Перед тем, как написать рецензию...
        
      </div>
      {
        reviews.map((review: any) => 
          <ReviewPost isFilmPage key={review.id} review={review} />)
      }
    </div>
  )
}