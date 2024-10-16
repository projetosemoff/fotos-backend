import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'

import { HealthController } from './controllers/health.controller'
import { NestHealthUseCase } from '../nest/use-cases/health'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [HealthController],
  providers: [NestHealthUseCase],
})
export class HttpModule {}
