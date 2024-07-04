import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInService } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Create Check In Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      name: 'TS Gym',
      description: '',
      phone: '',
      latitude: 0,
      longitude: 0,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should allow user to create a gym check in', async () => {
    const { checkIn } = await sut.handle({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    // If check in was created successfully, it should have an id
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not allow user to create a gym check in if they have already created one on the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 9, 0, 0))

    await sut.handle({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      sut.handle({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should allow user to create a gym check in if they have not created one on that date yet', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 9, 0, 0))

    await sut.handle({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2024, 0, 2, 9, 0, 0))

    const { checkIn } = await sut.handle({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not allow user to create a gym check in if they are too far away from the gym', async () => {
    await gymsRepository.create({
      id: 'gym-02',
      name: 'FitBallet',
      description: '',
      phone: '',
      latitude: 53.4106672,
      longitude: -1.4673056,
    })

    await expect(() =>
      sut.handle({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: 53.4543123,
        userLongitude: 1.5046098,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
