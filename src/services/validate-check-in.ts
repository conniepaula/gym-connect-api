import dayjs from 'dayjs'

import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { MaxElapsedTimeError } from './errors/max-elapsed-time-error'

interface ValidateCheckInServiceRequest {
  checkInId: string
}

interface ValidateCheckInServiceResponse {
  checkIn: CheckIn
}

export class ValidateCheckInService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async handle(
    params: ValidateCheckInServiceRequest,
  ): Promise<ValidateCheckInServiceResponse> {
    const { checkInId } = params

    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const timeElapsedSinceCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    const MAX_VALIDATION_TIME_IN_MINS = 20

    if (timeElapsedSinceCheckInCreation > MAX_VALIDATION_TIME_IN_MINS) {
      throw new MaxElapsedTimeError()
    }
    checkIn.validated_at = new Date()

    return { checkIn }
  }
}
