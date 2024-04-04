import { useState, type FormEvent } from 'react'
import { supabase } from '../../libs/supabaseClient'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { z } from 'zod'

export const SignUpForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  const schema = z
    .object({
      email: z
        .string()
        .email({ message: '無効なEmailです' })
        .min(1, { message: 'Emailは必須です' }),
      password: z
        .string()
        .min(8, { message: 'パスワードは最低8文字である必要があります' })
        .min(1, { message: 'パスワードは必須です' }),
      confirmPassword: z
        .string()
        .min(1, { message: '確認用パスワードは必須です' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'パスワードと確認用パスワードが一致しません',
      path: ['confirmPassword'],
    })

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()

    try {
      schema.parse({ email, password, confirmPassword })
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) {
        console.log(error)
        return
      }

      alert('メールが送られました')
      window.location.href = '/'
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors(e.errors.map((error) => error.message))
      } else {
        console.log(e)
      }
    }
  }
  return (
    <form
      className='bg-stone-200 p-5 w-[400px] rounded-lg flex flex-col gap-2'
      onSubmit={submitHandler}
    >
      <h3 className='font-bold text-lg'>新規登録(無料)</h3>
      <label className='input input-bordered flex items-center gap-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='w-4 h-4 opacity-70'
        >
          <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
          <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
        </svg>
        <input
          type='text'
          className='grow'
          placeholder='Email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
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
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
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
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
          }}
        />
      </label>
      {errors.map((error) => (
        <div key={error} className='text-error font-bold'>
          {error}
        </div>
      ))}
      <button className='btn btn-primary' type='submit'>
        新規登録
      </button>

      <div className='divider'>OR</div>

      <button
        className='btn btn-outline bg-white'
        type='button'
        onClick={() => {
          supabase.auth.signInWithOAuth({ provider: 'google' })
        }}
      >
        <FcGoogle size={30} />
        Googleで登録
      </button>
      <button
        className='btn btn-outline bg-white'
        type='button'
        onClick={() => {
          supabase.auth.signInWithOAuth({ provider: 'github' })
        }}
      >
        <FaGithub size={30} />
        GitHubで登録
      </button>
    </form>
  )
}
