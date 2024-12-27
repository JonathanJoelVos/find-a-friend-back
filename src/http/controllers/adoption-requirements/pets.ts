import { PetNotFoundError } from '@/use-cases/errors/pet-not-exists-error'
import { makeGetAdoptionRequirementsUseCase } from '@/use-cases/factories/make-get-adoption-requeriments-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function pets(request: FastifyRequest, reply: FastifyReply) {
  const adoptionRequerimentsParamSchema = z.object({
    petId: z.string(),
  })

  const { petId } = adoptionRequerimentsParamSchema.parse(request.params)

  const getAdoptionRequirementsUseCase = makeGetAdoptionRequirementsUseCase()

  try {
    const adoptionRequirements = await getAdoptionRequirementsUseCase.execute({
      petId,
    })

    return reply.status(200).send(adoptionRequirements)
  } catch (error) {
    if (error instanceof PetNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }
  }
}
