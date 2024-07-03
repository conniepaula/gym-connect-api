import { describe, it, expect, beforeEach } from 'vitest'

import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })

  it('should allow user to authenticate session', async () => {
    await usersRepository.create({
      name: 'Jane Doe',
      email: 'jane@doe.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.handle({
      email: 'jane@doe.com',
      password: '123456',
    })

    // If user was created successfully, it should have an id of type String
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not authenticate session with invalid email', async () => {
    await expect(() =>
      sut.handle({
        email: 'jane@doe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not authenticate session with invalid email', async () => {
    await usersRepository.create({
      name: 'Jane Doe',
      email: 'jane@doe.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.handle({
        email: 'jane@doe.com',
        password: '111111',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
