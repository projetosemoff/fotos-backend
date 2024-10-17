import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CacheModule } from '../cache/cache.module'
import { PhotographerRepository } from '@/domain/photos/application/repositories/photographer-repository'
import { PrismaPhotographerRepository } from './prisma/repositories/prisma-photographer-repository'

@Module({
  imports: [CacheModule],
  providers: [
    PrismaService,
    {
      provide: PhotographerRepository,
      useClass: PrismaPhotographerRepository,
    },
  ],
  exports: [PrismaService, PhotographerRepository],
})
export class DatabaseModule {}
