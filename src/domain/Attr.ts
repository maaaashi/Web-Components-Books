export class Control {
  constructor() {}
}

export class Attr {
  constructor(
    private _name: string,
    private _description: string,
    private _defaultValue: string,
    private _controls: string,
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

  get controls() {
    return this._controls
  }

  static create(...args: string[]) {
    return new Attr(args[0], args[1], args[2], args[3])
  }
}
