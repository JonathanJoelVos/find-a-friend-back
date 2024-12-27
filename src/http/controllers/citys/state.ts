import { makeFetchCitysByStateUseCase } from '@/use-cases/factories/make-fetch-citys-by-state-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function state(request: FastifyRequest, reply: FastifyReply) {
  const fetchCitysParamsSchema = z.object({
    stateId: z.string(),
  })

  const { stateId } = fetchCitysParamsSchema.parse(request.params)

  const fetchCitysByState = makeFetchCitysByStateUseCase()

  const { citys } = await fetchCitysByState.execute({
    stateId,
  })

  return reply.status(200).send({
    citys,
  })
}
