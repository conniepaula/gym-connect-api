import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymService } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Register Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })
  it('should allow gym to be registered', async () => {
    const { gym } = await sut.handle({
      name: 'Gym 1',
      description:
        'Aliqua est incididunt nulla ea officia exercitation nisi aliquip et pariatur occaecat incididunt.',
      phone: '07481930510',
      latitude: 53.4106672,
      longitude: -1.4673056,
    })

    // If gym was created successfully, it should have an id of type String
    expect(gym.id).toEqual(expect.any(String))
  })
})
