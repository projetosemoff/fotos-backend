import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/app.module'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Get health version (E2E)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('[GET] /health', async () => {
    const response = await request(app.getHttpServer()).get('/health').send()

    expect(response.statusCode).to.be.equal(200)
    expect(response.body).to.have.property('version')
    expect(response.body.version).to.be.a('string')
  })
})
