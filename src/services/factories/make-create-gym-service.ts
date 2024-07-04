import { CreateGymService } from '../create-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCreateGymService() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const createGymService = new CreateGymService(prismaGymsRepository)

  return createGymService
}
