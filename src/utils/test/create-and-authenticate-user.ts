import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
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

  return { token }
}
