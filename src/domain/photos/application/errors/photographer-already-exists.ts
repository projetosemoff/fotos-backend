import { DomainError } from '@/core/errors/domain-error'

export class PhotographerAlreadyExistsError
  extends Error
  implements DomainError
{
  public readonly id: number

  constructor() {
    super('photographer.already.exists.error')
    this.id = 409
  }
}
