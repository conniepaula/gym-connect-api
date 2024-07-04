import { GymsRepository } from '@/repositories/gyms-repository'
import type { Gym } from '@prisma/client'

interface GetNearbyGymsServiceRequest {
  userLatitude: number
  userLongitude: number
}

interface GetNearbyGymsServiceResponse {
  gyms: Array<Gym>
}
export class GetNearbyGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async handle(
    params: GetNearbyGymsServiceRequest,
  ): Promise<GetNearbyGymsServiceResponse> {
    const { userLatitude, userLongitude } = params

    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
