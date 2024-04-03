export class Control {
  constructor(
    private _value: string,
    private _type: string,
  ) {}

  get value() {
    return this._value
  }

  set value(v: string) {
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
    private _control: Control,
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
