import { AppModule } from '@/app.module'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

describe('Get health version (E2E)', () => {
  let app: NestFastifyApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile()

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    )

    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  test('[GET] /health', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health',
    })

    const responseBody = JSON.parse(response.payload)

    expect(response.statusCode).toBe(200)
    expect(responseBody).toHaveProperty('version')
    expect(typeof responseBody.version).toBe('string')
  })
})
