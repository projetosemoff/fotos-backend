import { HashGenerator } from '@/core/cryptography/hash-generator'
import { PhotographerRepository } from '@/domain/photos/application/repositories/photographer-repository'
import { RegisterPhotographerUseCase } from '@/domain/photos/application/use-cases/register-photographer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestRegisterPhotographerUseCase extends RegisterPhotographerUseCase {
  constructor(
    photographerRepository: PhotographerRepository,
    hashGenerator: HashGenerator
  ) {
    super(photographerRepository, hashGenerator)
  }
}
