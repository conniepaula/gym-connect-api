import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'

describe('Authenticate Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    // User creation
    await request(app.server).post('/users').send({
      name: 'Jane Doe',
      email: 'jane@doe.com',
      password: 'test123',
    })

    // User authentication
    const response = await request(app.server).post('/sessions').send({
      email: 'jane@doe.com',
      password: 'test123',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
})
