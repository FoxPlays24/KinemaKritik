import { VotesFooter } from "../VotesFooter"

export async function Vote({ filmId, voted }: { filmId: string, voted: number }) {
  const votes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/film/votes?id=${filmId}`).then(res => res.json())
  
  return (
    <div className="flex flex-col gap-4 divide-slate-300">
      <h2 className="text-xl font-semibold">Оценка</h2>
      <hr />
      <div className="flex gap-4 items-center select-none">
        <VotesFooter voted={voted} content={{filmId: filmId}} votes={votes?.rating} />
        <p className="text-lg">Кол-во оценок: {votes?.count || 0}</p>
      </div>
    </div>
  )
}