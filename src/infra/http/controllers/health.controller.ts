import { NestHealthUseCase } from '@/infra/nest/use-cases/health'
import { Public } from '@/infra/auth/public'
import { Controller, Get } from '@nestjs/common'

@Controller('/health')
@Public()
export class HealthController {
  constructor(private readonly sut: NestHealthUseCase) {}

  @Get()
  async handle() {
    const result = await this.sut.execute()

    const version = result.value.version

    return { version: version }
  }
}
