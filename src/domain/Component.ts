import type { ReactNode } from 'react'
import type { Attr } from './Attr'

export class WebComponent {
  constructor(
    private _name: string,
    private _tagName: string,
    private _attributes: Attr[],
    private _children?: ReactNode[],
  ) {}

  createHTMLElement() {
    const attrString = this._attributes
      .map((attr) => `${attr.name}="${attr.controls}"`)
      .join(' ')

    return `<${this._tagName} ${attrString}>${this._children}</${this._tagName}>`
  }

  get attributes() {
    return this._attributes
  }
}
