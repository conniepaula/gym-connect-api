import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { GetNearbyGymsService } from './get-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: GetNearbyGymsService

describe('Get Nearby Gyms Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new GetNearbyGymsService(gymsRepository)
  })
  it('should get all gyms located within maximum nearby distance', async () => {
    await gymsRepository.create({
      name: 'Nearby Gym',
      description:
        'Aliqua est incididunt nulla ea officia exercitation nisi aliquip et pariatur occaecat incididunt.',
      phone: '07481930510',
      latitude: 37.774929,
      longitude: -122.419416,
    })

    await gymsRepository.create({
      name: 'Further Away Gym',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      phone: '07481930511',
      latitude: 37.804363,
      longitude: -122.271114,
    })

    // User is 10.2km away from Nearby Gym and 18.1km away from Further Away Gym
    const userCoordinates = {
      userLatitude: 37.6879,
      userLongitude: -122.4702,
    }

    const { gyms } = await sut.handle(userCoordinates)

    // Only Nearby Gym should be fetched
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Nearby Gym' })])
  })

  it('should not get any gyms if there are none located within maximum nearby distance', async () => {
    await gymsRepository.create({
      name: 'Far Away Gym',
      description:
        'Aliqua est incididunt nulla ea officia exercitation nisi aliquip et pariatur occaecat incididunt.',
      phone: '07481930510',
      latitude: 37.804363,
      longitude: -122.271114,
    })

    await gymsRepository.create({
      name: 'Even Further Away Gym',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      phone: '07481930511',
      latitude: 37.9569,
      longitude: -122.4702,
    })

    // User is over 15km away from both gyms
    const userCoordinates = {
      userLatitude: 37.6879,
      userLongitude: -122.4702,
    }

    const { gyms } = await sut.handle(userCoordinates)

    // Gym array should be empty
    expect(gyms).toHaveLength(0)
  })
})
