import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Get Nearby Gyms Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should get all gyms located within maximum nearby distance', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Nearby Gym',
        description:
          'Aliqua est incididunt nulla ea officia exercitation nisi aliquip et pariatur occaecat incididunt.',
        phone: '07481930510',
        latitude: 37.774929,
        longitude: -122.419416,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Further Away Gym',
        description:
          'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        phone: '07481930511',
        latitude: 37.804363,
        longitude: -122.271114,
      })

    // User is 10.2km away from Nearby Gym and 18.1km away from Further Away Gym
    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({ latitude: 37.6879, longitude: -122.4702 })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ name: 'Nearby Gym' }),
    ])
  })
})
