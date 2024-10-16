import { z } from 'zod'

export const envSchema = z.object({
  NAME: z.string().optional().default('application name'),
  PORT: z.coerce.number().optional().default(3333),
  REQUEST_LOGGER: z
    .string()
    .default('false')
    .transform(value => value.toLowerCase() === 'true'),
  DATABASE_URL: z.string().url(),
  REDIS_HOST: z.string().optional().default('127.0.0.1'),
  REDIS_PORT: z.coerce.number().optional().default(6379),
  REDIS_DB: z.coerce.number().optional().default(0),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
})

export type Env = z.infer<typeof envSchema>
