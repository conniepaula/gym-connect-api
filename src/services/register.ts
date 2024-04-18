import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterServiceParams {
  name: string
  email: string
  password: string
}
export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async handle(params: RegisterServiceParams) {
    const { name, email, password } = params

    const userWithDuplicateEmail = await this.usersRepository.findByEmail(email)

    if (userWithDuplicateEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    await this.usersRepository.create({ name, email, password_hash })
  }
}
