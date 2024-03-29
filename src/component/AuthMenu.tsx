import { useEffect, useState } from 'react'
import { supabase } from '../libs/supabaseClient'
import type { Session } from '@supabase/supabase-js'

export const AuthMenu = () => {
  const [session, setSession] = useState<null | Session>(null)
  useEffect(() => {
    supabase.auth.getSession().then((session) => {
      setSession(session.data.session)
    })
  })

  const signUp = async () => {
    window.location.href = '/auth/sign_up'
  }
  const signIn = async () => {
    window.location.href = '/auth/sign_in'
  }

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
