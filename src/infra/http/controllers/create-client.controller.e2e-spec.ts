import { AppModule } from '@/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { Test } from '@nestjs/testing'

describe('Create Client (E2E)', () => {
  let app: NestFastifyApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    )

    prisma = moduleRef.get(PrismaService)

    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  test('[POST] /client', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/client',
      payload: {
        name: 'Nathan',
        email: 'teste@gmail.com',
        phoneNumber: '99999999999',
      },
    })

    expect(response.statusCode).toBe(201)

    const userOnDatabase = await prisma.client.findUnique({
      where: {
        email: 'teste@gmail.com',
      },
    })

    expect(userOnDatabase).toBeTruthy()
  })
})
