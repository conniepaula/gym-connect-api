import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCreateGymService } from '@/services/factories/make-create-gym-service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    name: z.string(),
    description: z.string().email().nullable(),
    phone: z.string().email().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { name, description, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body)

  const createService = makeCreateGymService()

  await createService.handle({
    name,
    description,
    phone,
    latitude,
    longitude,
  })

  return reply.status(201).send()
}
