import { GetUserCheckInHistoryService } from '../get-user-check-in-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserCheckInHistoryService() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const getUserCheckInHistory = new GetUserCheckInHistoryService(
    prismaCheckInsRepository,
  )

  return getUserCheckInHistory
}
