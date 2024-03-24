import { useEffect, useRef, type FC, useState } from 'react'

type Props = {
  src: string
  code: string
}

export const WebComponentsFrame: FC<Props> = ({ src, code }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const [attributes, setAttr] = useState([
    {
      name: 'code',
      description: 'country code',
      default: 'JP',
      controls: 'US',
    },
    { name: 'size', description: 'size', default: '64', controls: '64' },
    {
      name: 'type',
      description: 'draw type',
      default: 'flat',
      controls: 'flat',
    },
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
            ${code}
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
      <pre className='bg-base-200 p-4'>{code}</pre>
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
          {attributes.map((attr, index) => (
            <tr key={index}>
              <td>{attr.name}</td>
              <td>{attr.description}</td>
              <td>{attr.default}</td>
              <td>{attr.controls}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
