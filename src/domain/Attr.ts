export class Control<T> {
  private _type: string

  constructor(private _value: T) {
    this._type = typeof _value
  }

  get value() {
    return this._value
  }

  set value(v: T) {
    this._value = v
  }

  get type() {
    return this._type
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
