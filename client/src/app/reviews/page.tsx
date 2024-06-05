import { Header } from "@/components/Header"
import { ReviewPost } from "@/components/post/ReviewPost"
import { getSession } from "@/utils/actions"
import { IReview } from "@/utils/types"
import { NotebookPen } from "lucide-react"

export default async function ReviewsPage() {
  const session = await getSession()
  const reviews : [IReview] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, { cache: "no-store" }).then(res => res.json())

  return (
    <>
      <Header title="Рецензии" secondary={`На сайте ${reviews.length} рецензий`} icon={<NotebookPen />} />
      <div className="flex flex-col p-4 gap-4">
        {
          reviews.map((review: IReview) => 
            <ReviewPost key={review.id} review={review} userLogin={session.userLogin} />)
        }
      </div>
    </>
  )
}