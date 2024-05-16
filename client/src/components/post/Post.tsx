import moment from "moment"
import Link from "next/link"

interface PostProps {
  icon?:      React.ReactElement
  title?:     string
  secondary?: string
  href:      string
  createdAt?: Date
  children:   React.ReactNode
  footer?:    React.ReactElement
  header?:    React.ReactElement
}

export function Post({icon, title, href, secondary, createdAt, children, footer, header }: PostProps) 
{
  return (
    <div className="border border-slate-300 rounded-2xl p-4 transition-colors hover:border-slate-500">
      {header}
      <a href={href} className="flex flex-col gap-4 mb-4">
        <div className="flex gap-2 items-center">
          {icon}
          { title && <h2 className="text-xl">{title}</h2> }
          <p className="text-slate-400">{secondary}</p>
          { createdAt && <p className="text-slate-400 ml-auto text-right">{moment(createdAt).format('ll')}</p> }
        </div>
        {children}
      </a>
      {footer}
    </div>
  )
}