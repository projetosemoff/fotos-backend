import { DomainError } from '@/core/errors/domain-error'

export class ClientAlreadyExistsError extends Error implements DomainError {
  public readonly id: number

  constructor() {
    super('client.already.exists.error')
    this.id = 409
  }
}
