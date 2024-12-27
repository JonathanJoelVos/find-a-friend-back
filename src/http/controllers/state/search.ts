import { StateNotFound } from '@/use-cases/errors/state-not-found-error'
import { makeFetchAllStatesUseCase } from '@/use-cases/factories/make-fetch-all-states-use-case'
import { makeSearchState } from '@/use-cases/factories/make-search-state-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchStateParamsSchema = z.object({
    stateName: z.string(),
  })

  const { stateName } = searchStateParamsSchema.parse(request.params)

  const searchState = makeSearchState()

  try {
    const { state } = await searchState.execute({
      name: stateName,
    })
    return reply.status(200).send({
      state,
    })
  } catch (error) {
    if (error instanceof StateNotFound) {
      return reply.status(404).send({
        message: error.message,
      })
    }
  }
}
