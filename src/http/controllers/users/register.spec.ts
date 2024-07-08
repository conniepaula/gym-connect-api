import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'

describe('Register Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should allow user to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Jane Doe',
      email: 'jane@doe.com',
      password: 'test123',
    })

    expect(response.statusCode).toEqual(201)
  })
})
