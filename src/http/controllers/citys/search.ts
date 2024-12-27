import { makeFetchCitysByStateUseCase } from '@/use-cases/factories/make-fetch-citys-by-state-use-case'
import { makeSearchCitys } from '@/use-cases/factories/make-search-citys-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const fetchCitysQuerySchema = z.object({
    name: z.string(),
  })

  const { name } = fetchCitysQuerySchema.parse(request.query)

  const searchCity = makeSearchCitys()

  const { citys } = await searchCity.execute({
    query: name,
  })

  return reply.status(200).send({
    citys,
  })
}
