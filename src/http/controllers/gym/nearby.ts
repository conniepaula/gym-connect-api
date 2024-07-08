import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetNearbyGymsService } from '@/services/factories/make-get-nearby-gyms-service'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const getNearbyGymsQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = getNearbyGymsQuerySchema.parse(request.body)

  const getNearbyGymsService = makeGetNearbyGymsService()

  const { gyms } = await getNearbyGymsService.handle({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send({ gyms })
}
