import type { ReactNode } from 'react'
import { Attr, Control } from './Attr'

export class WebComponent {
  constructor(
    private _name: string,
    private _tagName: string,
    private _attributes: Attr<any>[],
    private _src: string,
    private _children?: ReactNode,
  ) {}

  createHTMLElement() {
    const attrString = this._attributes
      .map((attr) => {
        if (attr.control.value) return `${attr.name}="${attr.control.value}"`
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

  static onChange(
    prev: WebComponent,
    attrName: string,
    attrValue: string,
  ): WebComponent {
    const newComponent = new WebComponent(
      'Country Flag Component',
      'country-flag',
      prev.attributes.map((a) =>
        a.name === attrName
          ? new Attr(
              a.name,
              a.description,
              a.defaultValue,
              new Control(a.control.type === 'number' ? +attrValue : attrValue),
            )
          : a,
      ),
      'https://maaaashi.github.io/country-flag/bundle.js',
    )
    return newComponent
  }
}
