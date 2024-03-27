import { useEffect, useState } from 'react'
import { supabase } from '../libs/supabaseClient'
import type { Session } from '@supabase/supabase-js'

export const AccountInfo = () => {
  const [session, setSession] = useState<null | Session>(null)
  useEffect(() => {
    supabase.auth.getSession().then((session) => {
      setSession(session.data.session)
    })
  })

  if (session) {
    return <div>ログイン済</div>
  } else {
    return <div>未ログイン</div>
  }
}
