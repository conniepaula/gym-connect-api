import { GetNearbyGymsService } from '../get-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeGetNearbyGymsService() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const getNearbyGymsService = new GetNearbyGymsService(prismaGymsRepository)

  return getNearbyGymsService
}
