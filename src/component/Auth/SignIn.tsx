import type { FormEvent } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { supabase } from '../../libs/supabaseClient'
export const SignInForm = () => {
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
  }
  return (
    <form
      className='bg-base-200 p-5 w-[400px] rounded-lg flex flex-col gap-2'
      onSubmit={submitHandler}
    >
      <h3 className='font-bold text-lg'>ログイン</h3>
      <label className='input input-bordered flex items-center gap-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='w-4 h-4 opacity-70'
        >
          <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z'></path>
        </svg>
        <input type='text' className='grow' placeholder='Username' required />
      </label>
      <label className='input input-bordered flex items-center gap-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='w-4 h-4 opacity-70'
        >
          <path
            fillRule='evenodd'
            d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
            clipRule='evenodd'
          ></path>
        </svg>
        <input
          type='password'
          className='grow'
          placeholder='Password'
          required
        />
      </label>

      <button className='btn btn-primary' type='submit'>
        Sign In
      </button>

      <div className='divider'>OR</div>

      <button
        className='btn btn-outline'
        type='button'
        onClick={() => {
          supabase.auth.signInWithOAuth({ provider: 'google' })
        }}
      >
        <FcGoogle size={30} />
        Login with Google
      </button>
      <button
        className='btn btn-outline'
        type='button'
        onClick={() => {
          supabase.auth.signInWithOAuth({ provider: 'github' })
        }}
      >
        <FaGithub size={30} />
        Login with GitHub
      </button>
      <button className='btn btn-outline' type='button' disabled>
        <FaXTwitter size={30} />
        Login with X
      </button>
    </form>
  )
}
