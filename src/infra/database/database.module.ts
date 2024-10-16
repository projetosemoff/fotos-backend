import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CacheModule } from '../cache/cache.module'

@Module({
  imports: [CacheModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
