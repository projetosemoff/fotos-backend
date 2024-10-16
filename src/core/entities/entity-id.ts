import { randomUUID } from 'node:crypto'

export class EntityID {
  private value: string

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  public equals(id: EntityID) {
    return id.toValue() === this.value
  }
}
