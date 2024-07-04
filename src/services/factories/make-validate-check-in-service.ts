import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInService } from '../validate-check-in'

export function makeValidateCheckInService() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const validateCheckInService = new ValidateCheckInService(
    prismaCheckInsRepository,
  )

  return validateCheckInService
}
