import { Gym, Prisma } from '@prisma/client'
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'
import { randomUUID } from 'node:crypto'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }
    this.items.push(gym)

    return gym
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)
    if (!gym) {
      return null
    }
    return gym
  }

  async findManyByQuery(query: string, page: number) {
    const caseInsensitiveQuery = new RegExp(query, 'i')
    return this.items
      .filter(
        (item) =>
          item.name.match(caseInsensitiveQuery) ||
          item.description?.match(caseInsensitiveQuery),
      )
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearby(params: FindManyNearbyParams) {
    const { latitude, longitude } = params
    const MAX_NEARBY_DISTANCE_IN_KM = 15

    return this.items.filter(
      (item) =>
        getDistanceBetweenCoordinates(
          { latitude, longitude },
          {
            latitude: item.latitude.toNumber(),
            longitude: item.longitude.toNumber(),
          },
        ) < MAX_NEARBY_DISTANCE_IN_KM,
    )
  }
}
