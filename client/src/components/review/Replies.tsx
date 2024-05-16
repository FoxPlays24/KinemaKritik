import { getSession } from "@/utils/actions"
import { ReplyUser } from "./ReplyUser"
import { ReplyPost } from "../post/ReplyPost"

export async function Replies({ review }: { review: any }) {
  const session = await getSession()
  const replies = await fetch(`${process.env.API_URL}/replies?review_id=${review.id}`).then(res => res.json())

  return (
    <>
      { session.isLoggedIn && <ReplyUser reviewId={review.id} /> }
      <div className="flex flex-col gap-4 divide-slate-300">
      {
        replies.map((reply: any) => 
          <ReplyPost isUserReview={session.userLogin === reply.login} key={reply.id} reply={reply} />)
      }
      </div>
    </>
  )
}