import type { FC, ReactNode } from "react"

export const Heading3: FC<{children: ReactNode}> = ({children}) => {
  return (
    <h3 className="text-lg font-bold">{children}</h3>
  )
}
