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
    const response = await request(app.getHttpServer()).get('/health').send()

    expect(response.statusCode).to.be.equal(200)
    expect(response.body).to.have.property('version')
    expect(response.body.version).to.be.a('string')
  })
})
