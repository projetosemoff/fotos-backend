import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CacheModule } from '../cache/cache.module'
import { PhotographerRepository } from '@/domain/photos/application/repositories/photographer-repository'
import { PrismaPhotographerRepository } from './prisma/repositories/prisma-photographer-repository'
import { ClientRepository } from '@/domain/photos/application/repositories/client-repository'
import { PrismaClientRepository } from './prisma/repositories/prisma-client-repository'

@Module({
  imports: [CacheModule],
  providers: [
    PrismaService,
    {
      provide: PhotographerRepository,
      useClass: PrismaPhotographerRepository,
    },
    {
      provide: ClientRepository,
      useClass: PrismaClientRepository,
    },
  ],
  exports: [PrismaService, PhotographerRepository, ClientRepository],
})
export class DatabaseModule {}
