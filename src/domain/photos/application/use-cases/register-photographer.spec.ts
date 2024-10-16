import { InMemoryPhotographerRepository } from '@test/domain/photos/repository/in-memory-photographer-repository'
import { Photographer } from '../../enterprise/entities/photographer'
import { RegisterPhotographerUseCase } from './register-photographer'
import { FakeHasher } from '@test/cryptography/fake-hasher'
import { describe, beforeEach, it, expect } from 'vitest'

let inMemoryPhotographerRepository: InMemoryPhotographerRepository<Photographer>
let fakeHasher: FakeHasher

let sut: RegisterPhotographerUseCase

describe('Register photographer', () => {
  beforeEach(() => {
    inMemoryPhotographerRepository =
      new InMemoryPhotographerRepository<Photographer>()
    fakeHasher = new FakeHasher()

    sut = new RegisterPhotographerUseCase(
      inMemoryPhotographerRepository,
      fakeHasher
    )
  })

  it('should be able to register a new photographer', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      photographer: inMemoryPhotographerRepository.items[0],
    })
  })

  it('should hash photograpther password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryPhotographerRepository.items[0].password).toEqual(
      hashedPassword
    )
  })
})
