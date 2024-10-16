import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify'
import { EnvService } from './infra/env/env.service'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    }
  )

  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:
      'Content-Type,Accept,Authorization,Access-Control-Allow-Origin',
  })

  const configService = app.get(EnvService)
  const port = configService.get('PORT')

  await app.listen(port, '0.0.0.0', async () => {
    const application_name = configService.get('NAME')
    console.log(`
      🚀   All done! Server running on:   ${await app.getUrl()}/

            ${'+-'.repeat(application_name.length || 0)}+
            |${application_name.split('').join('|').toUpperCase()}|
            ${'+-'.repeat(application_name.length || 0)}+

      ${'-'.repeat(application_name.length || 20)}\t⬇️  ⬇️  ⬇️
    `)
  })
}
bootstrap()
