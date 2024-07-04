import { GymsRepository } from '@/repositories/gyms-repository'
import type { Gym } from '@prisma/client'

interface SeachGymsRequest {
  query: string
  page: number
}

interface SearchGymsResponse {
  gyms: Array<Gym>
}
export class SearchGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async handle(params: SeachGymsRequest): Promise<SearchGymsResponse> {
    const { query, page } = params

    const gyms = await this.gymsRepository.findManyByQuery(query, page)

    return { gyms }
  }
}
