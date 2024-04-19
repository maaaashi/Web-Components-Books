import type { Session } from '@supabase/supabase-js'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '../../libs/supabaseClient'
import { RegisterWebcomponentForm } from '../RegisterWebcomponentForm'

export const RegisterWebcomponentButton = () => {
  const [session, setSession] = useState<Session | null>()

  const modalRef = useRef<HTMLDialogElement>(null)

  const openModal = () => {
    if (!modalRef.current) return
    modalRef.current.showModal()
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })
  }, [session])
  return (
    <>
      {session && (
        <button className='btn btn-secondary w-full' onClick={openModal}>
          登録
        </button>
      )}
      <dialog id='my_modal_2' className='modal' ref={modalRef}>
        <div className='modal-box'>
          <RegisterWebcomponentForm />
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </>
  )
}
