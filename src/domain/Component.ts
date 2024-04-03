import type { ReactNode } from 'react'
import { Attr, Control } from './Attr'

export class WebComponent {
  constructor(
    private _name: string,
    private _description: string,
    private _publisher: string,
    private _tagName: string,
    private _attributes: Attr[],
    private _src: string,
    private _children?: ReactNode,
  ) {}

  createHTMLElement() {
    const attrString = this._attributes
      .map((attr) => {
        if (attr.control.value) {
          if (attr.control.type === 'string') {
            return `${attr.name}="${attr.control.value}"`
          } else {
            return `${attr.name}=${attr.control.value}`
          }
        }
        return ''
      })
      .filter((attr) => attr)
      .join(' ')

    return `<${this._tagName} ${attrString}>${this._children || ''}</${this._tagName}>`
  }

  get name() {
    return this._name
  }

  get description() {
    return this._description
  }

  get publisher() {
    return this._publisher
  }

  get tagnName() {
    return this._tagName
  }

  get src() {
    return this._src
  }

  get attributes() {
    return this._attributes
  }

  static onChange(
    prev: WebComponent,
    attrName: string,
    attrValue: string,
  ): WebComponent {
    const newComponent = new WebComponent(
      prev.name,
      prev.description,
      prev.publisher,
      prev.tagnName,
      prev.attributes.map((a) =>
        a.name === attrName
          ? new Attr(
              a.name,
              a.description,
              a.defaultValue,
              new Control(attrValue, a.control.type),
            )
          : a,
      ),
      prev.src,
    )
    return newComponent
  }
}
