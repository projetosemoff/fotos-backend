import { HealthUseCase } from '@/domain/health/application/use-cases/health'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestHealthUseCase extends HealthUseCase {}
