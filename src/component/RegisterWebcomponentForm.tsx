import { useState, type FormEvent } from 'react'
import { supabase } from '../libs/supabaseClient'
import { CiCircleChevRight } from 'react-icons/ci'

type InsertWebcomponent = {
  name: string
  description: string
  tagname: string
  src: string
}

export const RegisterWebcomponentForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [tagname, setTagname] = useState('')
  const [src, setSrc] = useState('')
  const insertWebcomponent = async () => {
    const { data, error } = await supabase
      .from('webcomponent')
      .insert<InsertWebcomponent>({
        name,
        description,
        tagname,
        src,
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
      <button type='submit' className='btn btn-primary mt-6'>
        Attribute の登録へ
        <CiCircleChevRight size={35} />
      </button>
    </form>
  )
}
