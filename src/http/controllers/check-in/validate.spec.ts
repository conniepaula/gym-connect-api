import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Validate Check-In Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should allow check-in to be validated', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    // Fetch only user in database
    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        name: 'Gym 01',
        description: 'Lorem ipsum dolor sit amet.',
        phone: '00000000',
        latitude: 53.4106672,
        longitude: -1.4673056,
      },
    })

    // Create user check-in
    let checkIn = await prisma.checkIn.create({
      data: { gym_id: gym.id, user_id: user.id },
    })

    const response = await request(app.server)
      .patch(`/check-in/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: { id: checkIn.id },
    })
    console.log(checkIn)
    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})
