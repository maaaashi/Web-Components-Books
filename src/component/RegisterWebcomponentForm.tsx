import { useState, type FormEvent } from 'react'
import { supabase } from '../libs/supabaseClient'
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci'
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6'

type InsertWebcomponent = {
  name: string
  description: string
  tagname: string
  src: string
  user_id: string
}

export const RegisterWebcomponentForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [tagname, setTagname] = useState('')
  const [src, setSrc] = useState('')
  const [step, setStep] = useState(1)
  const insertWebcomponent = async () => {
    const user = await supabase.auth.getSession()
    const userId = user.data.session?.user.id
    if (!userId) return

    const { data, error } = await supabase
      .from('webcomponent')
      .insert<InsertWebcomponent>({
        name,
        description,
        tagname,
        src,
        user_id: userId,
      })
    if (error) {
      console.error(error)
    } else {
      console.log(data)
    }
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    insertWebcomponent()
  }

  return (
    <form onSubmit={submitHandler} className='flex flex-col'>
      {step === 1 && (
        <div
          className={
            step === 1 ? 'animate-slideInLeft' : 'animate-slideInRight'
          }
        >
          <h3 className='font-bold text-lg'>Web Component を登録</h3>
          <label className='form-control w-full'>
            <div className='label'>
              <span className='label-text'>Name</span>
            </div>
            <input
              className='input input-bordered w-full'
              placeholder='例) Country Flag Component'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className='form-control'>
            <div className='label'>
              <span className='label-text'>Description</span>
            </div>
            <textarea
              className='textarea textarea-bordered h-24'
              placeholder='例) 国旗を表示するコンポーネント'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              value={tagname}
              onChange={(e) => setTagname(e.target.value)}
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
              value={src}
              onChange={(e) => setSrc(e.target.value)}
            />
          </label>
        </div>
      )}
      {step === 2 && (
        <div
          className={step < 2 ? 'animate-slideInLeft' : 'animate-slideInRight'}
        >
          <h3 className='font-bold text-lg'>Attribute を登録</h3>
        </div>
      )}
      {step === 3 && (
        <div
          className={step < 3 ? 'animate-slideInLeft' : 'animate-slideInRight'}
        >
          <h3 className='font-bold text-lg'>確認</h3>
          <dl>
            <dt>Name</dt>
            <dd>{name}</dd>
            <dt>Description</dt>
            <dd>{description}</dd>
            <dt>Tag Name</dt>
            <dd>{tagname}</dd>
            <dt>Src</dt>
            <dd>{src}</dd>
          </dl>
        </div>
      )}

      <div className='join'>
        <button
          className='btn mt-6 join-item flex-1'
          type='button'
          disabled={step === 1}
          onClick={() => {
            setStep((c) => c - 1)
          }}
        >
          <FaAnglesLeft />
        </button>
        {step !== 3 ? (
          <button
            className='btn btn-primary mt-6 join-item flex-1'
            type='button'
            onClick={() => {
              setStep((c) => c + 1)
            }}
          >
            <FaAnglesRight />
          </button>
        ) : (
          <button
            className='btn btn-primary mt-6 join-item flex-1'
            type='submit'
          >
            登録
          </button>
        )}
      </div>
    </form>
  )
}
