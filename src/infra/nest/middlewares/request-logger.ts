import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { FastifyRequest, FastifyReply } from 'fastify'

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger(RequestLoggerMiddleware.name)

  use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    const { method, url, ip, headers } = req
    const { statusCode } = res
    const userAgent = headers['user-agent'] || ''

    const startTime = Date.now()

    const responseTime = Date.now() - startTime

    this.logger.log(
      `${method} ${url} ${statusCode} - ${userAgent} ${ip} - ${responseTime}ms`
    )

    next()
  }
}
