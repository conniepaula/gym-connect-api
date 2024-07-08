import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('User Check-In Metrics Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch user total check-in count', async () => {
    const { token } = await createAndAuthenticateUser(app)

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

    // Create user check-ins
    await prisma.checkIn.createMany({
      data: [
        { gym_id: gym.id, user_id: user.id },
        { gym_id: gym.id, user_id: user.id },
      ],
    })

    const response = await request(app.server)
      .get('/check-in/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkInCount).toEqual(2)
  })
})
