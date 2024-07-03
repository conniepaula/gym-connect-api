import { describe, it, expect, beforeEach } from 'vitest'

import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileService } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(usersRepository)
  })

  it('should fetch user profile data if user id exists in database', async () => {
    const createdUser = await usersRepository.create({
      name: 'Jane Doe',
      email: 'jane@doe.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.handle({ userId: createdUser.id })

    // If user data was fetched correctly:
    //      - user id should match as the one used to fetch it
    //      - user data should match created user data
    expect(user.id).toEqual(createdUser.id)
    expect(user.name).toEqual(createdUser.name)
    expect(user.email).toEqual(createdUser.email)
  })

  it('should throw resource not found error if user id does not exist in database', async () => {
    await expect(() =>
      sut.handle({
        userId: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
