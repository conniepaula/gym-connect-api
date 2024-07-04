import { GymsRepository } from '@/repositories/gyms-repository'
import type { Gym } from '@prisma/client'

interface CreateGymServiceRequest {
  name: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymServiceResponse {
  gym: Gym
}
export class CreateGymService {
  constructor(private gymsRepository: GymsRepository) {}

  async handle(
    params: CreateGymServiceRequest,
  ): Promise<CreateGymServiceResponse> {
    const { name, description, phone, latitude, longitude } = params

    const gym = await this.gymsRepository.create({
      name,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
