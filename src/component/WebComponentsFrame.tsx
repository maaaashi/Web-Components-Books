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
