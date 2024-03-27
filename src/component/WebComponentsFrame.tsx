import { useEffect, useRef, type FC, useState } from 'react'
import { WebComponent } from '../domain/Component'
import { Attr, Control } from '../domain/Attr'

type Props = {
  id: string
}

export const WebComponentsFrame: FC<Props> = () => {
  const [component, setComponent] = useState<WebComponent>(
    new WebComponent(
      'Country Flag Component',
      'country-flag',
      [
        new Attr('code', 'country code', 'JP', new Control('US')),
        new Attr('size', '16 | 24 | 32 | 48 | 64', 32, new Control(32)),
        new Attr(
          'type',
          'flat | shiny',
          'flat',
          new Control<'flat' | 'shiny' | ''>(''),
        ),
      ],
      'https://maaaashi.github.io/country-flag/bundle.js',
    ),
  )
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
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

  return (
    <>
      <h2 className='font-bold text-lg'>{component.name}</h2>
      <iframe
        ref={iframeRef}
        sandbox='allow-scripts'
        style={{ width: '100%', height: '500px' }}
        title='Sandboxed Component'
      ></iframe>
      <h3 className='font-bold text-lg'>Usage</h3>
      <pre className='bg-base-200 p-4'>{component.createHTMLElement()}</pre>
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
                <input
                  className='input input-bordered'
                  type={attr.control.type}
                  value={attr.control.value || ''}
                  onChange={(e) => {
                    setComponent((prev) => {
                      return WebComponent.onChange(
                        prev,
                        attr.name,
                        e.target.value,
                      )
                    })
                    attr.control.value = e.target.value
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
