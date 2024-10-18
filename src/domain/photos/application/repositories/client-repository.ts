import { AbstractRepository } from '@/core/repositories/abstract-repository'
import { Client } from '../../enterprise/entities/client'

export abstract class ClientRepository extends AbstractRepository<Client> {
  abstract findByEmail(email: string): Promise<Client | null>
}
