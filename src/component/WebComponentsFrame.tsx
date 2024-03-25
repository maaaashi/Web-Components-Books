import { useEffect, useRef, type FC } from 'react'
import { WebComponent } from '../domain/Component'
import { Attr } from '../domain/Attr'

type Props = {
  id: string
}

export const WebComponentsFrame: FC<Props> = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const src = 'https://maaaashi.github.io/country-flag/bundle.js'
  const component = new WebComponent('Country Flag Component', 'country-flag', [
    Attr.create('code', 'country code', 'JP', 'US'),
    Attr.create('size', 'size', '64', '64'),
    Attr.create('type', 'draw type', 'flat', 'flat'),
  ])

  useEffect(() => {
    const iframeContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Sandboxed Component</title>
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src *; img-src *;">
          <script type="text/javascript" src="${src}" defer="defer"></script>
        </head>
        <body>
          ${component.createHTMLElement()}
        </body>
        </html>
      `

    if (iframeRef.current) {
      iframeRef.current.srcdoc = iframeContent
    }
  }, [])

  return (
    <>
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
              <td>{attr.controls}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
