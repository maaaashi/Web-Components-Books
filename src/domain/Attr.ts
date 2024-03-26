export class Control<T> {
  constructor(private _value: T) {}

  get value() {
    return this._value
  }

  inputType() {
    if (typeof this._value === 'string') return 'text'
    if (typeof this._value === 'number') return 'number'
    return 'text'
  }
}

export class Attr<T> {
  constructor(
    private _name: string,
    private _description: string,
    private _defaultValue: string | number | boolean | null | undefined,
    private _control: Control<T>,
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
