import { EntityID } from '@/core/entities/entity-id'
import { PaginationParams } from '@/core/repositories/pagination-params'

export interface AbstractRepositoryImplProps {
  id: EntityID
}

export class AbstractRepositoryImpl<T extends AbstractRepositoryImplProps> {
  public items: T[] = []

  async findById(id: string | number): Promise<T | null> {
    const item = this.items.find(item => item.id.toString() === id)
    return item || null
  }

  async findMany({ page = 1, size = 20 }: PaginationParams): Promise<T[]> {
    return this.items.slice((page - 1) * size, page * size)
  }

  async create(item: T): Promise<void> {
    this.items.push(item)
  }

  async save(item: T): Promise<void> {
    const index = this.items.findIndex(i => i.id === item.id)
    this.items[index] = item
  }

  async delete(item: T): Promise<void> {
    const index = this.items.findIndex(i => i.id === item.id)
    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }
}
