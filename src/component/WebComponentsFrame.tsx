import { useEffect, useRef, type FC } from 'react'

type Props = {
  src: string
  code: string
}

export const WebComponentsFrame: FC<Props> = ({ src, code }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

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
          <tr>
            <td>code</td>
            <td>country code</td>
            <td>JP</td>
            <td>US</td>
          </tr>
          <tr>
            <td>size</td>
            <td>size</td>
            <td>64</td>
            <td>64</td>
          </tr>
          <tr>
            <td>type</td>
            <td>draw type</td>
            <td>flat</td>
            <td>flat</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
