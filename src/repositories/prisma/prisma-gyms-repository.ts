import { Gym, Prisma } from '@prisma/client'
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({ data })

    return gym
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({ where: { id } })

    return gym
  }

  async findManyByQuery(query: string, page: number) {
    const itemsPerPage = 20

    const gyms = await prisma.gym.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
    })

    return gyms
  }

  async findManyNearby(params: FindManyNearbyParams) {
    const { latitude, longitude } = params
    const MAX_NEARBY_DISTANCE_IN_KM = 15

    const gyms = await prisma.$queryRaw<Array<Gym>>`
    SELECT * FROM gyms
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= ${MAX_NEARBY_DISTANCE_IN_KM}
    `

    return gyms
  }
}
