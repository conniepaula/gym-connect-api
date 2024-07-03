import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterService } from './register'

import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterService

describe('Register Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterService(usersRepository)
  })
  it('should allow user to register', async () => {
    const { user } = await sut.handle({
      name: 'Jane Doe',
      email: 'jane@doe.com',
      password: '123456',
    })

    // If user was created successfully, it should have an id of type String
    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.handle({
      name: 'Jane Doe',
      email: 'jane@doe.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not allow a user to register with an already registered email address', async () => {
    const email = 'jane@doe.com'

    await sut.handle({
      name: 'Jane Doe',
      email,
      password: '123456',
    })

    // Promise should reject as a user with the same email already exists
    await expect(() =>
      sut.handle({
        name: 'Jane Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
