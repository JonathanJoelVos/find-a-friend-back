import { FastifyInstance } from 'fastify'
import { search } from './search'
import { state } from './state'

export async function citysRoutes(app: FastifyInstance) {
  app.get('/citys/:stateId', state)
  app.get('/citys', search)
}
