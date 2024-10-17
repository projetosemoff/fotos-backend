import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'

import { HealthController } from './controllers/health.controller'
import { NestHealthUseCase } from '../nest/use-cases/health'
import { NestRegisterPhotographerUseCase } from '../nest/use-cases/register-photographer'
import { RegisterPhotographerController } from './controllers/register-photographer.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [HealthController, RegisterPhotographerController],
  providers: [NestHealthUseCase, NestRegisterPhotographerUseCase],
})
export class HttpModule {}
