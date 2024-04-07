import { useEffect, useRef, type FC, useState } from 'react'
import { WebComponent } from '../domain/Component'
import {
  Attr,
  CheckboxControl,
  NumberControl,
  TextControl,
} from '../domain/Attr'
import { supabase } from '../libs/supabaseClient'

type Props = {
  id: string
}

export const WebComponentsFrame: FC<Props> = ({ id }) => {
  const [component, setComponent] = useState<WebComponent>()
  const [value, setValue] = useState<'light' | 'dark'>('light')

  const iframeRef = useRef<HTMLIFrameElement>(null)

  const loadWebComponent = async () => {
    const { data: webcomponent } = await supabase
      .from('webcomponent')
      .select('*')
      .eq('id', id)
      .single()
    const { data: attributes } = await supabase
      .from('attribute')
      .select('*')
      .eq('webcomponent_id', id)
    const attrs = attributes!.map((attr: any) => {
      const control =
        attr.type === 'text'
          ? new TextControl(String(''), attr.type)
          : attr.type === 'number'
            ? new NumberControl(Number(''), attr.type)
            : new CheckboxControl(Boolean(''), attr.type)
      return new Attr(attr.name, attr.description, attr.default_value, control)
    })
    const { name, description, tagname, src } = webcomponent
    setComponent(
      new WebComponent(name, description, 'maaaashi', tagname, attrs, src),
    )
  }

  useEffect(() => {
    loadWebComponent()
  }, [id])

  useEffect(() => {
    if (!component) {
      return
    }

    const iframeContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Sandboxed Component</title>
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src *; img-src *;">
          <script type="text/javascript" src="${component.src}" defer="defer"></script>
        </head>
        <body>
          ${component.createHTMLElement()}
        </body>
        </html>
      `

    if (iframeRef.current) {
      iframeRef.current.srcdoc = iframeContent
    }
  }, [component])

  if (!component) {
    return <div>Loading...</div>
  }

  return (
    <>
      <section className='flex items-center gap-3'>
        <h2 className='font-bold text-2xl'>{component.name}</h2>
      </section>
      <section className='bg-stone-200 p-4'>
        <p>{component.description}</p>
      </section>
      <div className='relative'>
        <h3 className='font-bold text-lg'>Preview</h3>
        <div className='w-40 absolute right-0 top-10'>
          <label className='cursor-pointer grid place-items-center'>
            <input
              type='checkbox'
              value={value}
              onChange={(e) => setValue(e.target.checked ? 'dark' : 'light')}
              className='toggle bg-stone-content row-start-1 col-start-1 col-span-2'
            />
            <svg
              className={`col-start-1 row-start-1 ${value === 'light' ? 'stroke-stone-900 fill-stonestroke-stone-900' : 'stroke-stone-200 fill-stonestroke-stone-200'}`}
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='12' cy='12' r='5' />
              <path d='M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4' />
            </svg>
            <svg
              className={`col-start-2 row-start-1 ${value === 'light' ? 'stroke-stone-900 fill-stonestroke-stone-900' : 'stroke-stone-200 fill-stonestroke-stone-200'}`}
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>
            </svg>
          </label>
        </div>
        <iframe
          ref={iframeRef}
          sandbox='allow-scripts'
          className={`w-full h-96 border border-dashed ${value === 'dark' ? 'bg-stone-700' : ''}`}
          title='Sandboxed Component'
        ></iframe>
      </div>
      <pre className='bg-stone-200 p-4'>{component.createHTMLElement()}</pre>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Default</th>
            <th>Controls</th>
          </tr>
        </thead>
        <tbody>
          {component.attributes.map((attr, index) => (
            <tr key={index}>
              <td>{attr.name}</td>
              <td>{attr.description}</td>
              <td>{attr.defaultValue}</td>
              <td>
                {attr.control.type === 'checkbox' ? (
                  <input
                    className='checkbox'
                    type={attr.control.type}
                    checked={!!attr.control.value}
                    onChange={(e) => {
                      setComponent((prev) => {
                        return WebComponent.onChange(
                          prev!,
                          attr.name,
                          e.target.checked,
                        )
                      })
                    }}
                  />
                ) : (
                  <input
                    className='input input-bordered'
                    type={attr.control.type}
                    value={attr.control.value || ''}
                    onChange={(e) => {
                      setComponent((prev) => {
                        return WebComponent.onChange(
                          prev!,
                          attr.name,
                          e.target.value,
                        )
                      })
                    }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
