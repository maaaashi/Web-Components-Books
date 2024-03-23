import { useEffect, useRef, type FC, type ReactNode } from 'react'

type Props = {
    src: string;
    code: string;
}

export const WebComponentsFrame: FC<Props> = ({ src, code }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

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
      `;
  
      if (iframeRef.current) {
        iframeRef.current.srcdoc = iframeContent;
      }
    }, []);

  return (
    <iframe
      ref={iframeRef}
      sandbox="allow-scripts"
      style={{ width: '100%', height: '500px' }}
      title="Sandboxed Component"
    ></iframe>
  )
}
