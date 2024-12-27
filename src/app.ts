import fastify from 'fastify'
import { ZodError } from 'zod'
import { citysRoutes } from './http/controllers/citys/routes'
import { petsRoutes } from './http/controllers/pets/routes'
import cors from '@fastify/cors'
import { statesRoutes } from './http/controllers/state/routes'
import { adoptionRequerimentsRoutes } from './http/controllers/adoption-requirements/routes'
import { orgsRoutes } from './http/controllers/orgs/routes'
import multer from 'fastify-multer'
import staticMode from '@fastify/static'
import path from 'path'

export const app = fastify()

app.register(cors)
app.register(petsRoutes)
app.register(citysRoutes)
app.register(statesRoutes)
app.register(adoptionRequerimentsRoutes)
app.register(orgsRoutes)

app.register(multer.contentParser)
app.register(staticMode, {
  root: path.resolve('uploads'),
  prefix: '/images/',
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: error.format(),
    })
  } else {
    // mandar para o DataDog
  }

  return reply.status(500).send()
})
