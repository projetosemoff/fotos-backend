import { AbstractRepository } from '@/core/repositories/abstract-repository'
import { Photographer } from '../../enterprise/entities/photographer'

export abstract class PhotographerRepository extends AbstractRepository<Photographer> {
  abstract findByEmail(email: string): Promise<Photographer | null>
}
