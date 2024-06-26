import { Attr, CheckboxControl, NumberControl, TextControl } from './Attr'

export class WebComponent {
  constructor(
    private _name: string,
    private _description: string,
    private _publisher: string,
    private _tagName: string,
    private _attributes: Attr[],
    private _src: string,
  ) {}

  createHTMLElement() {
    const attrString = this._attributes
      .map((attr) => {
        if (attr.control.value) {
          if (attr.control.type === 'text') {
            return ` ${attr.name}="${attr.control.value}"`
          } else if (attr.control.type === 'number') {
            return ` ${attr.name}=${attr.control.value}`
          } else {
            return ` ${attr.name}`
          }
        }
        return ''
      })
      .filter((attr) => attr)
      .join('')

    return `<${this._tagName}${attrString}></${this._tagName}>`
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
    attrValue: string | number | boolean,
  ): WebComponent {
    const newComponent = new WebComponent(
      prev.name,
      prev.description,
      prev.publisher,
      prev.tagnName,
      prev.attributes.map((a) => {
        if (a.name !== attrName) return a
        const control =
          a.control.type === 'text'
            ? new TextControl(String(attrValue), a.control.type)
            : a.control.type === 'number'
              ? new NumberControl(+attrValue, a.control.type)
              : new CheckboxControl(!!attrValue, a.control.type)
        return new Attr(a.name, a.description, a.defaultValue, control)
      }),
      prev.src,
    )
    return newComponent
  }
}
