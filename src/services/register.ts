import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterServiceParams {
  name: string
  email: string
  password: string
}

export async function registerService(params: RegisterServiceParams) {
  const { name, email, password } = params

  const userWithDuplicateEmail = await prisma.user.findUnique({
    where: { email },
  })

  if (userWithDuplicateEmail) {
    throw new Error('A user with this email already exists.')
  }

  const password_hash = await hash(password, 6)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
