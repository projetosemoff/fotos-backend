import { AppModule } from '@/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { Test } from '@nestjs/testing'

describe('Create Account (E2E)', () => {
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

  test('[POST] /register', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/register',
      payload: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      },
    })

    expect(response.statusCode).toBe(201)

    const userOnDatabase = await prisma.photographer.findUnique({
      where: {
        email: 'johndoe@example.com',
      },
    })

    expect(userOnDatabase).toBeTruthy()
  })
})
