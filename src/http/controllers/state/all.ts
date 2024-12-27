import { makeFetchAllStatesUseCase } from '@/use-cases/factories/make-fetch-all-states-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function all(request: FastifyRequest, reply: FastifyReply) {
  const fetchCitysByState = makeFetchAllStatesUseCase()

  const { states } = await fetchCitysByState.execute()

  return reply.status(200).send({
    states,
  })
}
