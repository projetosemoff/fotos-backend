import type { ClientPhotographer } from '@/domain/photos/enterprise/entities/client-photographer'
import { AbstractRepositoryImpl } from '@test/repositories/abstract-repository-impl'

export class InMemoryClientPhotographerRepository extends AbstractRepositoryImpl<ClientPhotographer> {}
