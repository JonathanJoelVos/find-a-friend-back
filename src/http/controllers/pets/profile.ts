import { PetNotFoundError } from '@/use-cases/errors/pet-not-exists-error'
import { makeGetPetProfileUseCase } from '@/use-cases/factories/make-get-pet-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const profilePetParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = profilePetParamsSchema.parse(request.params)

  const getPet = makeGetPetProfileUseCase()
  try {
    const { pet } = await getPet.execute({
      petId,
    })

    return reply.status(200).send({
      pet,
    })
  } catch (error) {
    if (error instanceof PetNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    throw error
  }
}
