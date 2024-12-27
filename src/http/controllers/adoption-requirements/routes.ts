import { FastifyInstance } from 'fastify'
import { pets } from './pets'

export async function adoptionRequerimentsRoutes(app: FastifyInstance) {
  app.get('/pets/adoption-requirements/:petId', pets)
}
