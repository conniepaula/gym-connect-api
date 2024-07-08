import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'

describe('Profile Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    // User creation
    await request(app.server).post('/users').send({
      name: 'Jane Doe',
      email: 'jane@doe.com',
      password: 'test123',
    })

    // User authentication
    const authResponse = await request(app.server).post('/sessions').send({
      email: 'jane@doe.com',
      password: 'test123',
    })

    const { token } = authResponse.body

    // Get user profile
    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({ email: 'jane@doe.com' }),
    )
  })
})
