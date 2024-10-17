import { EntityID } from '@/core/entities/entity-id'
import { Photographer } from '@/domain/photos/enterprise/entities/photographer'
import { Photographer as PrismaPhotographer, Prisma } from '@prisma/client'

export class PrismaPhotographerMapper {
  static toDomain(raw: PrismaPhotographer): Photographer {
    return Photographer.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        inactivatedAt: raw.inactivatedAt,
      },
      new EntityID(raw.id)
    )
  }

  static toPrisma(
    photographer: Photographer
  ): Prisma.PhotographerUncheckedCreateInput {
    return {
      id: photographer.id.toString(),
      name: photographer.name,
      email: photographer.email,
      password: photographer.password,
      createdAt: photographer.createdAt,
      updatedAt: photographer.updatedAt,
      inactivatedAt: photographer.inactivatedAt,
    }
  }
}
