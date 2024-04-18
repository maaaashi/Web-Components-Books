import type { FC } from 'react'

type Props = {
  id: string
  title: string
}

export const SideMenuItem: FC<Props> = ({ title, id }) => {
  const move = () => {
    window.location.href = `/webcomponents/${id}`
  }
  return (
    <button className='btn btn-secondary w-full justify-start' onClick={move}>
      {title}
    </button>
  )
}
