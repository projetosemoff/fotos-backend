import { ClientRepository } from '@/domain/photos/application/repositories/client-repository'
import { CreateClientUseCase } from '@/domain/photos/application/use-cases/create-client'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestCreateClientUseCase extends CreateClientUseCase {
  constructor(clientRepository: ClientRepository) {
    super(clientRepository)
  }
}
