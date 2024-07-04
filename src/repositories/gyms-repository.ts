import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}
export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
  findManyByQuery(query: string, page: number): Promise<Array<Gym>>
  findManyNearby(params: FindManyNearbyParams): Promise<Array<Gym>>
}
