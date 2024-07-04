import { CheckInService } from '../check-in'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeCheckInService() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const prismaGymsRepository = new PrismaGymsRepository()
  const checkInService = new CheckInService(
    prismaCheckInsRepository,
    prismaGymsRepository,
  )

  return checkInService
}
