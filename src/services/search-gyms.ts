import { GymsRepository } from '@/repositories/gyms-repository'
import type { Gym } from '@prisma/client'

interface SeachGymsServiceRequest {
  query: string
  page: number
}

interface SearchGymsServiceResponse {
  gyms: Array<Gym>
}
export class SearchGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async handle(
    params: SeachGymsServiceRequest,
  ): Promise<SearchGymsServiceResponse> {
    const { query, page } = params

    const gyms = await this.gymsRepository.findManyByQuery(query, page)

    return { gyms }
  }
}
