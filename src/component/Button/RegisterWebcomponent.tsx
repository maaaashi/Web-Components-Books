import type { Session } from '@supabase/supabase-js'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '../../libs/supabaseClient'

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
        <button className='btn btn-primary w-full' onClick={openModal}>
          登録
        </button>
      )}
      <dialog id='my_modal_2' className='modal' ref={modalRef}>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Web Componentを登録</h3>
          <label className='form-control w-full'>
            <div className='label'>
              <span className='label-text'>Name</span>
            </div>
            <input
              type='text'
              placeholder='Type here'
              className='input input-bordered w-full'
            />
          </label>
          <label className='form-control'>
            <div className='label'>
              <span className='label-text'>Description</span>
            </div>
            <textarea
              className='textarea textarea-bordered h-24'
              placeholder='Bio'
            ></textarea>
          </label>
          <label className='form-control w-full'>
            <div className='label'>
              <span className='label-text'>Tag Name</span>
            </div>
            <input
              type='text'
              placeholder='Type here'
              className='input input-bordered w-full'
            />
          </label>
          <label className='form-control w-full'>
            <div className='label'>
              <span className='label-text'>Src</span>
            </div>
            <input
              type='text'
              placeholder='Type here'
              className='input input-bordered w-full'
            />
          </label>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}
