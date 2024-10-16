import { right, Either } from '@/core/either'

type HealthUseCaseResponse = Either<null, { version: string }>

export class HealthUseCase {
  async execute(): Promise<HealthUseCaseResponse> {
    return right({ version: process.env.npm_package_version })
  }
}
