import { getSession } from "@/utils/actions"
import { ReviewPost } from "../post/ReviewPost"
import { ReviewUser } from "./ReviewUser"

export async function Reviews({ filmLink, isVoted }: { filmLink: string, isVoted: number }) {
  const session = await getSession()
  const reviews = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews?film=${filmLink}`).then(res => res.json())
  const review = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews?film=${filmLink}&user_login=${session.userLogin}`).then(res => res.json())

  return (
    <div className="flex flex-col gap-4 divide-slate-300">
      <h2 className="text-xl font-semibold">Рецензии</h2>
      <hr />
      <ReviewUser filmLink={filmLink} review={review} isVoted={isVoted} isLoggedIn={session.isLoggedIn} />
      {
        reviews.map((review: any) => 
          <ReviewPost isFilmPage key={review.id} review={review} userLogin={session.userLogin} />)
      }
    </div>
  )
}