import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Check-In History Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch check-in history', async () => {
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
      .get('/check-in/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({ gym_id: gym.id, user_id: user.id }),
      expect.objectContaining({ gym_id: gym.id, user_id: user.id }),
    ])
  })
})
