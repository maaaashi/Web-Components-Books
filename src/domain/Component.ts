import type { ReactNode } from 'react'
import type { Attr } from './Attr'

export class WebComponent {
  constructor(
    private _name: string,
    private _tagName: string,
    private _attributes: Attr[],
    private _src: string,
    private _children?: ReactNode,
  ) {}

  createHTMLElement() {
    const attrString = this._attributes
      .map((attr) => {
        if (attr.controls) return `${attr.name}="${attr.controls}"`
        return ''
      })
      .filter((attr) => attr)
      .join(' ')

    return `<${this._tagName} ${attrString}>${this._children || ''}</${this._tagName}>`
  }

  get name() {
    return this._name
  }

  get src() {
    return this._src
  }

  get attributes() {
    return this._attributes
  }
}
