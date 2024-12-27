import { FastifyInstance } from 'fastify'
import { all } from './all'
import { search } from './search'

export async function statesRoutes(app: FastifyInstance) {
  app.get('/states', all)
  app.get('/states/:stateName', search)
}
