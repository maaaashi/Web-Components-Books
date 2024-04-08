import type { Session } from '@supabase/supabase-js'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { supabase } from '../../libs/supabaseClient'

export const RegisterWebcomponentButton = () => {
  const [session, setSession] = useState<Session | null>()
  const modalRef = useRef<HTMLDialogElement>(null)

  const openModal = () => {
    if (!modalRef.current) return
    modalRef.current.showModal()
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
          <form onSubmit={submitHandler} className='flex flex-col'>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Name</span>
              </div>
              <input
                type='text'
                placeholder='例) Country Flag Component'
                className='input input-bordered w-full'
              />
            </label>
            <label className='form-control'>
              <div className='label'>
                <span className='label-text'>Description</span>
              </div>
              <textarea
                className='textarea textarea-bordered h-24'
                placeholder='例) 国旗を表示するコンポーネント'
              ></textarea>
            </label>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Tag Name</span>
              </div>
              <input
                type='text'
                placeholder='例) country-flag'
                className='input input-bordered w-full'
              />
            </label>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Src</span>
              </div>
              <input
                type='text'
                placeholder='例) https://maaaashi.github.io/country-flag/bundle.js'
                className='input input-bordered w-full'
              />
            </label>
            <button type='submit' className='btn btn-primary mt-6'>
              登録
            </button>
          </form>
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
