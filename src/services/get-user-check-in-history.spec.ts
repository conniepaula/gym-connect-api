import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserCheckInHistoryService } from './get-user-check-in-history'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserCheckInHistoryService

describe('Get User Check In History Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserCheckInHistoryService(checkInsRepository)
  })

  it('should allow user to get their check-in history', async () => {
    await checkInsRepository.create({ gym_id: 'gym-01', user_id: 'user-01' })
    await checkInsRepository.create({ gym_id: 'gym-02', user_id: 'user-01' })

    const { checkIns } = await sut.handle({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it('should get 20 check-in history items per page', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await sut.handle({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
