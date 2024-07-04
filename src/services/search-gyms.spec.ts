import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsService } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsService

describe('Search Gyms Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsService(gymsRepository)
  })
  it('should allow gym to be searched by name', async () => {
    await gymsRepository.create({
      name: 'Jacksonville Gym',
      description:
        'Aliqua est incididunt nulla ea officia exercitation nisi aliquip et pariatur occaecat incididunt.',
      phone: '07481930510',
      latitude: 53.4106672,
      longitude: -1.4673056,
    })
    await gymsRepository.create({
      name: 'Honing Bay Fitness',
      description:
        'Aliqua est incididunt nulla ea officia exercitation nisi aliquip et pariatur occaecat incididunt.',
      phone: '07481930510',
      latitude: 53.4106672,
      longitude: -1.4673056,
    })

    const { gyms } = await sut.handle({ query: 'Jacksonville', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Jacksonville Gym' }),
    ])
  })

  it('should allow gym to be searched by description', async () => {
    const description =
      'Do you want to become legendary? Start your fitness journey at our crossfit gym!'

    await gymsRepository.create({
      name: 'Legends',
      description,
      phone: '07481930510',
      latitude: 53.4106672,
      longitude: -1.4673056,
    })
    await gymsRepository.create({
      name: 'Honing Bay Fitness',
      description:
        'Aliqua est incididunt nulla ea officia exercitation nisi aliquip et pariatur occaecat incididunt.',
      phone: '07481930510',
      latitude: 53.4106672,
      longitude: -1.4673056,
    })

    const { gyms } = await sut.handle({ query: 'crossfit', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        description,
      }),
    ])
  })

  it('should allow gym search to be case insensitive', async () => {
    await gymsRepository.create({
      name: 'Honing Bay Fitness',
      description:
        'Aliqua est incididunt nulla ea officia exercitation nisi aliquip et pariatur occaecat incididunt.',
      phone: '07481930510',
      latitude: 53.4106672,
      longitude: -1.4673056,
    })

    const { gyms } = await sut.handle({ query: 'hOnInG', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        name: 'Honing Bay Fitness',
      }),
    ])
  })

  it('should fetch paginated list with 20 items per page', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        name: `Gym ${i}`,
        description:
          'Aliqua est incididunt nulla ea officia exercitation nisi aliquip et pariatur occaecat incididunt.',
        phone: '07481930510',
        latitude: 53.4106672,
        longitude: -1.4673056,
      })
    }

    const { gyms } = await sut.handle({ query: 'gym', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        name: 'Gym 21',
      }),
      expect.objectContaining({
        name: 'Gym 22',
      }),
    ])
  })
})
