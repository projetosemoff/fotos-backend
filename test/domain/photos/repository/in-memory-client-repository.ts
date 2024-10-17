import { Client } from '@/domain/photos/enterprise/entities/client'
import { AbstractRepositoryImpl } from '@test/repositories/abstract-repository-impl'

export class InMemoryClientRepository<
  T extends Client,
> extends AbstractRepositoryImpl<T> {
  async findByEmail(email: string): Promise<T | null> {
    const item = this.items.find(item => item.email.toString() === email)
    return item || null
  }
}
