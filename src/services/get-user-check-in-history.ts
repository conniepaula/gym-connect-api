import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserCheckInHistoryServiceRequest {
  userId: string
  page: number
}

interface GetUserCheckInHistoryServiceResponse {
  checkIns: Array<CheckIn>
}

export class GetUserCheckInHistoryService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async handle(
    params: GetUserCheckInHistoryServiceRequest,
  ): Promise<GetUserCheckInHistoryServiceResponse> {
    const { userId, page } = params
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return { checkIns }
  }
}
