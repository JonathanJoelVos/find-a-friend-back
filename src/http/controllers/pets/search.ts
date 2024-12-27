import { makeFetchPetsByCityUseCase } from '@/use-cases/factories/make-fetch-pets-by-city-use-case'
import {
  PetAgeProps,
  PetIndependenceProps,
  PetSizeProps,
  PetTypeProps,
} from '@/use-cases/types/pet-filter-types'
import { parseQueryParams } from '@/utils/parseQueryParams'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export interface QueryParamsProps {
  age?: PetAgeProps
  energy?: number
  level_of_dependence?: PetIndependenceProps
  size?: PetSizeProps
  type?: PetTypeProps | 'all'
  page?: number
}

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const createPetQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const createPetParamsSchema = z.object({
    cityId: z.string(),
  })

  const { cityId } = createPetParamsSchema.parse(request.params)
  const { page } = createPetQuerySchema.parse(request.query)

  const fetchPetsByCity = makeFetchPetsByCityUseCase()

  try {
    const query = parseQueryParams<QueryParamsProps>(request.query)
    if (query.energy) {
      query.energy = Number(query.energy)
    }

    if (query.type && query.type === 'all') {
      delete query.type
    }

    if (query.page) {
      delete query.page
    }

    const { pets } = await fetchPetsByCity.execute({
      cityId,
      page,
      query,
    })

    return reply.status(200).send({
      pets,
    })
  } catch (error) {
    console.log(error)
    return reply.status(400).send({
      message: 'Params inválidos',
    })
  }
}
