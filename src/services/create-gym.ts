import { GymsRepository } from '@/repositories/gyms-repository'
import type { Gym } from '@prisma/client'

interface CreateGymRequest {
  name: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymResponse {
  gym: Gym
}
export class CreateGymService {
  constructor(private gymsRepository: GymsRepository) {}

  async handle(params: CreateGymRequest): Promise<CreateGymResponse> {
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
