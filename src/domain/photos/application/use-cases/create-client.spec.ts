import { InMemoryClientRepository } from '@test/domain/photos/repository/in-memory-client-repository'
import { Client } from '../../enterprise/entities/client'
import { CreateClientUseCase } from './create-client'
import { describe, beforeEach, it, expect } from 'vitest'

let inMemoryClientRepository: InMemoryClientRepository<Client>

let sut: CreateClientUseCase

describe('Create client', () => {
  beforeEach(() => {
    inMemoryClientRepository = new InMemoryClientRepository<Client>()

    sut = new CreateClientUseCase(inMemoryClientRepository)
  })
})
