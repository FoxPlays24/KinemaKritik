"use server"

import { getIronSession } from "iron-session"
import { sessionOptions, ISession, defaultSession } from "./lib"
import { cookies } from "next/headers"
import { revalidatePath, revalidateTag } from "next/cache"

//
//
// Authorization
//
//

export async function getSession() {
  const session = await getIronSession<ISession>(cookies(), sessionOptions)
  
  if (!session.isLoggedIn)
    session.isLoggedIn = defaultSession.isLoggedIn
  
  return session
}

export async function register(inputs: any) {
  const session = await getSession()

  const result = await fetch(`${process.env.API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(inputs)
  })

  if (!result.ok) {
    const data = await result.json()
    throw new Error(data)
  }
  
  session.userLogin  = inputs.login
  session.isLoggedIn = true

  await session.save()
}

export async function login(inputs: any) {
  const session = await getSession()
  
  const result = await fetch(`${process.env.API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(inputs)
  })
  
  if (!result.ok) {
    const data = await result.json()
    throw new Error(data)
  }

  const data = await result.json()

  session.userLogin  = data.login
  session.isLoggedIn = true

  await session.save()
}

export async function logout() {
  const session = await getSession()
  session.destroy()
}

//
//
// Vote
//
//

export async function vote(content: any, value: number) {
  const session = await getSession()

  const result = content.reviewId && await fetch(`${process.env.API_URL}/review/vote`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ 
      user_login: session.userLogin,
      review_id:  content.reviewId,
      voted:      value
    })
  }) || content.filmId && await fetch(`${process.env.API_URL}/film/vote`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ 
      user_login: session.userLogin,
      film_id:    content.filmId,
      voted:      value
    })
  })
  
  if (!result || !result.ok)
    throw new Error(result.status)

  revalidatePath("/", "page")
}

//
//
// Review
//
//

export async function review({ filmLink, title, content }: { filmLink: string, title: string, content: string }) {
  const session = await getSession()

  const result = await fetch(`${process.env.API_URL}/review`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ 
      user_login: session.userLogin,
      link:       filmLink,
      title:      title,
      content:    content
    })
  })

  if (!result.ok) {
    const data = await result.json()
    throw new Error(data)
  }

  revalidatePath("/film/", "layout")
}

export async function reviewRemove(reviewId: string) {
  const result = await fetch(`${process.env.API_URL}/review/remove`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ review_id: reviewId })
  })

  if (!result.ok) {
    const data = await result.json()
    throw new Error(data)
  }

  revalidatePath("/film/", "layout")
}