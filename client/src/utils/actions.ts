"use server"

import { getIronSession } from "iron-session"
import { sessionOptions, ISession, defaultSession } from "./lib"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

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

  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(inputs)
  })

  if (!result || !result.ok) {
    const data = await result.json()
    return { "type": result.status, "message": data }
  }
  
  session.userLogin  = inputs.login
  session.isLoggedIn = true

  await session.save()
}

export async function login(inputs: any) {
  const session = await getSession()
  
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(inputs)
  })

  if (!result || !result.ok) {
    const data = await result.json()
    return { "type": result.status, "message": data }
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

  const result = content.reviewId && await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/vote`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ 
      user_login: session.userLogin,
      review_id:  content.reviewId,
      voted:      value
    })
  }) || content.filmId && await fetch(`${process.env.NEXT_PUBLIC_API_URL}/film/vote`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ 
      user_login: session.userLogin,
      film_id:    content.filmId,
      voted:      value
    })
  })
  
  if (!result || !result.ok)
    return result.status

  revalidatePath("/", "layout")
}

//
//
// Review
//
//

export async function review({ filmLink, title, content }: { filmLink: string, title: string, content: string }) {
  const session = await getSession()

  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
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
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/remove`, {
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

//
//
// Profile
//
//

interface IEditProfile {
  userLogin:    string,
  profileImage: string,
  coverImage:   string,
  username:     string,
  status:       string
}

export async function editProfile({ userLogin, profileImage, coverImage, username, status }: IEditProfile) {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/edit`, {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ 
      login:         userLogin,
      profile_image: profileImage,
      cover_image:   coverImage,
      username:      username,
      status:        status
    })
  })

  if (!result.ok) {
    const data = await result.json()
    throw new Error(data)
  }

  revalidatePath("/user/", "layout")
}

//
//
// Reply
//
//

export async function reply({ reviewId, parentId, content }: { reviewId: number, parentId?: string, content: string }) {
  const session = await getSession()

  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reply`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ 
      user_login: session.userLogin,
      review_id: reviewId,
      parent_id: parentId,
      content
    })
  })

  if (!result.ok) {
    const data = await result.json()
    console.error(data)
    throw new Error(data)
  }

  revalidatePath("/review/", "layout")
}

export async function replyRemove(replyId: number) {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reply?reply_id=${replyId}`, {
    method: 'DELETE',
    headers: { 'Content-type': 'application/json' }
  })

  if (!result.ok) {
    const data = await result.json()
    throw new Error(data)
  }

  revalidatePath("/review/", "layout")
}

//
//
// Password
//
//

export async function compareLoginMail(loginMail: string) {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/compare`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ login_mail: loginMail })
  })
  const data = await result.json()

  if (!result || !result.ok)
    return { "type": result.status, "message": data }
  
  return data
}

export async function compareCodes(code: string) {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/compare/code?code=${code}`)

  if (!result || !result.ok) {
    const data = await result.json()
    return { "type": result.status, "message": data }
  }
}

export async function pwdChange(newPassword: string, code: string) {
  const session = await getSession()

  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/password/change`, {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ 
      new_password: newPassword,
      code
    })
  })

  if (!result || !result.ok) {
    const data = await result.json()
    return { "type": result.status, "message": data }
  }

  const data = await result.json()

  session.userLogin  = data.user_login
  session.isLoggedIn = true

  await session.save()
}