import { useEffect, useState } from 'react'
import { SideMenuItem } from './Button/SideMenuItem'
import { supabase } from '../libs/supabaseClient'

export const SideMenuItems = () => {
  const [items, setItems] = useState<{ title: string; id: string }[]>()

  useEffect(() => {
    supabase
      .from('webcomponent')
      .select('id, name')
      .then(({ data, error }) => {
        if (error) {
          console.error(error)
        } else {
          setItems(
            data.map((d) => {
              return {
                title: d.name,
                id: d.id,
              }
            }),
          )
        }
      })
  }, [])

  if (!items) return <div>Loading...</div>

  return (
    <ul className='flex flex-col gap-3'>
      {items.map((l) => {
        return (
          <li>
            <SideMenuItem title={l.title} id={l.id} />
          </li>
        )
      })}
    </ul>
  )
}
