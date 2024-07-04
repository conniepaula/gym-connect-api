import { SearchGymsService } from '../search-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeSearchGymsService() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const searchGymsService = new SearchGymsService(prismaGymsRepository)

  return searchGymsService
}
