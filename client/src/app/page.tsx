
import { Header } from "@/components/Header"
import { FilmPost } from "@/components/post/FilmPost"
import { ReviewPost } from "@/components/post/ReviewPost"
import { getSession } from "@/utils/actions"
import { Home } from "lucide-react"

export default async function MainPage() {
  const session = await getSession()
  const posts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, { cache: 'no-store' }).then(res => res.json())
  
  return (
    <>
      <Header title="Лента" icon={<Home />}/>
      <div className="flex flex-col p-4 gap-4">
        {
          posts.map((post: any) => 
            <>
              {
                post.type=="film"   ? <FilmPost key={post.id} film={post} /> : 
                post.type=="review" ? <ReviewPost key={post.id} review={post} userLogin={session.userLogin} /> : <></>
              }
            </>)
        }
      </div>
    </>
  )
}