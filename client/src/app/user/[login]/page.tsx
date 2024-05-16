import { UserPageInfo } from "@/components/UserPageInfo"
import { Header } from "@/components/Header"
import { ReviewPost } from "@/components/post/ReviewPost"
import { getSession } from "@/utils/actions"
import { declOfNum } from "@/utils/strings"
import { User } from "lucide-react"
import { notFound } from "next/navigation"

export default async function UserPage({ params }: any) {
  const login = params.login
  let user = await fetch(`${process.env.API_URL}/user?login=${login}`, { cache: 'no-store' }).then(res => res.json())
  
  if (!user[0]) notFound()
  user = user[0]

  const session = await getSession()
  const reviews = await fetch(`${process.env.API_URL}/reviews?user_login=${login}`).then(res => res.json())

  return (
    <>
      <Header hasBackButton title={user.username} secondary={user?.reviews>0 && `${user?.reviews} ${declOfNum(user?.reviews, ['рецензия', 'рецензии', 'рецензий'])}` || undefined} icon={<User />}/>
      <div className="flex flex-col p-4 gap-6">
        <UserPageInfo user={user} userLogin={login} isUser={session.userLogin === login} />
        {
          reviews.map((review: any) => 
            <ReviewPost key={review.id} review={review} userLogin={session.userLogin} />)
        }
      </div>
    </>
  )
}