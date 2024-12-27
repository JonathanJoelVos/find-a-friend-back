import { FastifyInstance } from 'fastify'
import { search } from './search'
import { create } from './create'
import { profile } from './profile'
import { upload } from '@/lib/multer'

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    '/pets/:orgId',
    {
      preHandler: upload.array('images'),
    },
    create,
  )
  app.get('/pets/:cityId', search)

  app.get('/pets/:petId/show', profile)
}
