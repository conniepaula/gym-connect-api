import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'

import { userRoutes } from './http/controllers/user/routes'
import { gymRoutes } from './http/controllers/gym/routes'
import { env } from './env'

export const app = fastify()

app.register(fastifyJwt, { secret: env.JWT_SECRET })
app.register(userRoutes)
app.register(gymRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Log error data to Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
