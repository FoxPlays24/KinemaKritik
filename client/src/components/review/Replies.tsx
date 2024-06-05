import { getSession } from "@/utils/actions"
import { ReplyPost } from "../post/ReplyPost"
import { IReply, IReview } from "@/utils/types"

async function ChildReplies({ reply }: { reply: IReply }) {
  const session = await getSession()
  const children = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/replies?parent_id=${reply.id}`).then(res => res.json())

  return (
    <div className={"flex flex-col gap-2 "+(reply.parent_id && " ml-4")}>
      <ReplyPost isLoggedIn={session.isLoggedIn} isUserReview={session.userLogin === reply.login} key={reply.id} reply={reply} />
      {
        children.map(async (reply: IReply) => 
          <ChildReplies reply={reply} />)
      }
    </div>
  )
}

export async function Replies({ review }: { review: IReview }) {
  const replies : [IReply] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/replies?review_id=${review.id}`).then(res => res.json())
  
  return (
    <>
      <div className="flex flex-col gap-4 divide-slate-300">
      {
        replies.map(async (reply: IReply) => {
          if (reply.parent_id) return
          return <ChildReplies reply={reply} />
        })
      }
      </div>
    </>
  )
}