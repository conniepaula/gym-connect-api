import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricsServiceRequest {
  userId: string
}

interface GetUserMetricsServiceResponse {
  checkInCount: number
}

export class GetUserMetricsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async handle(
    params: GetUserMetricsServiceRequest,
  ): Promise<GetUserMetricsServiceResponse> {
    const { userId } = params
    const checkInCount = await this.checkInsRepository.countByUserId(userId)

    return { checkInCount }
  }
}
