import { SessionOptions } from "iron-session"

export interface ISession {
  userLogin?: string
  isLoggedIn: boolean
}

export const defaultSession : ISession = {
  isLoggedIn: false
}

export const sessionOptions : SessionOptions = {
  password: process.env.SECRET!,
  cookieName: "kinemakritik-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  }
}