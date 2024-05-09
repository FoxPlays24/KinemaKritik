import { Header } from "@/components/Header"
import { ReviewPost } from "@/components/post/ReviewPost"
import { bufferToBase64, declOfNum } from "@/utils/strings"
import { User } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"

function UserInfo({user}: any) {
  return (
    <div>
      {
        user?.cover_image 
        ? <Image src={bufferToBase64(user.cover_image)||""} alt="Cover image" width={0} height={0} className="w-full h-52 rounded-2xl object-cover" />
        : <div className="w-full h-52 rounded-2xl bg-slate-300" />
      }

      <div className="flex px-8 gap-4">
        <Image src={bufferToBase64(user.profile_image)||"/placeholders/profile.png"} alt="Profile picture" width={200} height={200}
        className="size-32 rounded-2xl border-2 border-white -mt-12" loading="lazy" placeholder="blur" blurDataURL="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQORfxcoX5ukY_PzdxKGee_n9XO4GwOwaPPhH2IbfyQw&s" />
        <div className="flex flex-col pt-4">
          <h2 className='text-2xl font-semibold'>{user.username}</h2>
          <p className='text-slate-400 leading-none'>{user.status}</p>
        </div>
      </div>
    </div>
  )
}

export default async function UserPage({ params }: any) {
  const login = params.login
  const user = await fetch(`${process.env.API_URL}/user?login=${login}`, { cache: 'no-store' }).then(res => res.json())
  
  if (!user[0]) notFound()
  
  const reviews = await fetch(`${process.env.API_URL}/reviews?user_login=${login}`).then(res => res.json())

  return (
    <>
      <Header hasBackButton title={user[0].username} secondary={user[0]?.reviews>0 && `${user[0]?.reviews} ${declOfNum(user[0]?.reviews, ['рецензия', 'рецензии', 'рецензий'])}` || undefined} icon={<User />}/>
      <div className="flex flex-col p-4 gap-6">
        <UserInfo user={user[0]} />
        {
          reviews.map((review: any) => 
            <ReviewPost key={review.id} review={review} />)
        }
      </div>
    </>
  )
}