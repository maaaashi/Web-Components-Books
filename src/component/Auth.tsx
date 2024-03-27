import { useEffect, useState } from 'react'
import { supabase } from '../libs/supabaseClient'
import type { Session } from '@supabase/supabase-js'

export const Auth = () => {
  const [session, setSession] = useState<null | Session>(null)
  useEffect(() => {
    supabase.auth.getSession().then((session) => {
      setSession(session.data.session)
    })
  })

  const signUp = async () => {}
  const signIn = async () => {}

  if (session) {
    return <div>ログイン済</div>
  } else {
    return (
      <div className='flex gap-2'>
        <button className='btn btn-outline' onClick={signUp}>
          Sign Up
        </button>
        <button className='btn' onClick={signIn}>
          Sign In
        </button>
      </div>
    )
  }
}
