export class TextControl {
  constructor(
    private _value: string,
    private _type: 'text',
  ) {}

  get value(): string {
    return this._value
  }

  set value(v: string) {
    this._value = v
  }

  get type() {
    return this._type
  }
}

export class NumberControl {
  constructor(
    private _value: number,
    private _type: 'number',
  ) {}

  get value(): number {
    return this._value
  }

  set value(v: number) {
    this._value = v
  }

  get type() {
    return this._type
  }
}

export class CheckboxControl {
  constructor(
    private _value: boolean,
    private _type: 'checkbox',
  ) {}

  get value(): boolean {
    return this._value
  }

  set value(v: boolean) {
    this._value = v
  }

  get type() {
    return this._type
  }
}

export class Attr {
  constructor(
    private _name: string,
    private _description: string,
    private _defaultValue: string | number | boolean | null | undefined,
    private _control: TextControl | NumberControl | CheckboxControl,
  ) {}

  get name() {
    return this._name
  }

  get description() {
    return this._description
  }

  get defaultValue() {
    return this._defaultValue
  }

  get control() {
    return this._control
  }
}
