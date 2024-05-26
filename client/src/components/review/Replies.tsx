import { getSession } from "@/utils/actions"
import { ReplyPost } from "../post/ReplyPost"

async function ChildReplies({ reply }: { reply: any }) {
  const session = await getSession()
  const children = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/replies?parent_id=${reply.id}`).then(res => res.json())

  return (
    <div className={"flex flex-col gap-2 "+(reply.parent_id && " ml-4")}>
      <ReplyPost isLoggedIn={session.isLoggedIn} isUserReview={session.userLogin === reply.login} key={reply.id} reply={reply} />
      {
        children.map(async (reply: any) => 
          <ChildReplies reply={reply} />)
      }
    </div>
  )
}

export async function Replies({ review }: { review: any }) {
  const replies = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/replies?review_id=${review.id}`).then(res => res.json())
  
  return (
    <>
      <div className="flex flex-col gap-4 divide-slate-300">
      {
        replies.map(async (reply: any) => {
          if (reply.parent_id) return
          return <ChildReplies reply={reply} />
        })
      }
      </div>
    </>
  )
}