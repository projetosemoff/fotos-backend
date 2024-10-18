import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { NestCreateClientUseCase } from '@/infra/nest/use-cases/create-client'
import { ClientAlreadyExistsError } from '@/domain/photos/application/errors/client-already-exists'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { Public } from '@/infra/auth/public'

const createClientBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
})

type CreateClientBodySchema = z.infer<typeof createClientBodySchema>

@Controller('/client')
@Public()
export class CreateClientController {
  constructor(private sut: NestCreateClientUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createClientBodySchema))
  async handle(@Body() body: CreateClientBodySchema) {
    const { name, email, phoneNumber } = body

    const result = await this.sut.execute({
      name,
      email,
      phoneNumber,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ClientAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
