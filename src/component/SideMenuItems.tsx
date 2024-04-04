import { useEffect, useState } from 'react'
import { SideMenuItem } from './Button/SideMenuItem'
import { supabase } from '../libs/supabaseClient'
import type { Session } from '@supabase/supabase-js'

export const SideMenuItems = () => {
  const [items, setItems] = useState<{ title: string; id: string }[]>()
  const [session, setSession] = useState<Session | null>()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })
  }, [session])

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
      {session && <button className='btn btn-primary w-full'>登録</button>}

      {items.map((l) => {
        return (
          <li key={l.id}>
            <SideMenuItem title={l.title} id={l.id} />
          </li>
        )
      })}
    </ul>
  )
}
