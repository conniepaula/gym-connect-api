import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
import { history } from './history'
import { validate } from './validate'
import { metrics } from './metrics'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function checkInRoutes(app: FastifyInstance) {
  // Add hook to all routes since they require authentication
  app.addHook('onRequest', verifyJWT)

  app.get('/check-in/history', history)
  app.get('/check-in/metrics', metrics)

  app.post('/gyms/:gymId/check-in', create)

  app.patch(
    '/check-in/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate,
  )
}
