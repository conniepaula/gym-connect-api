import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserCheckInHistoryService } from '@/services/factories/make-get-user-check-in-history-service'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const getUserCheckInHistoryService = makeGetUserCheckInHistoryService()

  const { checkIns } = await getUserCheckInHistoryService.handle({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({ checkIns })
}
