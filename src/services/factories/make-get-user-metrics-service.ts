import { GetUserMetricsService } from '../get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetricsService() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const getUserProfileService = new GetUserMetricsService(
    prismaCheckInsRepository,
  )

  return getUserProfileService
}
