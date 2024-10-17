import { Injectable } from '@nestjs/common'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { PhotographerRepository } from '@/domain/photos/application/repositories/photographer-repository'
import { Photographer } from '@/domain/photos/enterprise/entities/photographer'
import { PrismaService } from '../prisma.service'
import { PrismaPhotographerMapper } from '../mappers/prisma-photographer-mapper'

@Injectable()
export class PrismaPhotographerRepository implements PhotographerRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Photographer | null> {
    const photographer = await this.prisma.photographer.findUnique({
      where: {
        email,
      },
    })

    if (!photographer) {
      return null
    }

    return PrismaPhotographerMapper.toDomain(photographer)
  }

  async findById(id: string): Promise<Photographer> {
    const photographer = await this.prisma.photographer.findUnique({
      where: {
        id,
      },
    })

    if (!photographer) {
      return null
    }

    return PrismaPhotographerMapper.toDomain(photographer)
  }

  async findMany({ page }: PaginationParams): Promise<Photographer[]> {
    const questionComments = await this.prisma.photographer.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questionComments.map(PrismaPhotographerMapper.toDomain)
  }

  async create(photographer: Photographer): Promise<void> {
    const data = PrismaPhotographerMapper.toPrisma(photographer)

    await this.prisma.photographer.create({
      data,
    })
  }

  async save(item: Photographer): Promise<void> {
    const data = PrismaPhotographerMapper.toPrisma(item)

    await this.prisma.photographer.update({
      where: {
        id: item.id.toString(),
      },
      data,
    })
  }
  async delete(item: Photographer): Promise<void> {
    await this.prisma.photographer.delete({
      where: {
        id: item.id.toString(),
      },
    })
  }
}
