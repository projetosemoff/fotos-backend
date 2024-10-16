import { PaginationParams } from './pagination-params'

export abstract class AbstractRepository<T> {
  abstract findById(id: string | number): Promise<T | null>
  abstract findMany(params: PaginationParams): Promise<T[]>
  abstract create(item: T): Promise<void>
  abstract save(item: T): Promise<void>
  abstract delete(item: T): Promise<void>
}
