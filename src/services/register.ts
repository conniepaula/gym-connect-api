import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import type { User } from '@prisma/client'

interface RegisterServiceParams {
  name: string
  email: string
  password: string
}

interface RegisterServiceResponse {
  user: User
}
export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async handle(
    params: RegisterServiceParams,
  ): Promise<RegisterServiceResponse> {
    const { name, email, password } = params

    const userWithDuplicateEmail = await this.usersRepository.findByEmail(email)

    if (userWithDuplicateEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
