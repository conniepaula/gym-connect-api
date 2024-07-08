import { makeGetUserProfileService } from '@/services/factories/make-get-user-profile-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub
  const getUserProfile = makeGetUserProfileService()
  const { user } = await getUserProfile.handle({ userId })

  return reply.status(200).send({ user: { ...user, password_hash: undefined } })
}
