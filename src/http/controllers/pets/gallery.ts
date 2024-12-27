import { PetNotFoundError } from '@/use-cases/errors/pet-not-exists-error'
import { makeFetchPetGalleryImagesUseCase } from '@/use-cases/factories/make-fetch-pet-gallery-images-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function gallery(request: FastifyRequest, reply: FastifyReply) {
  const profilePetParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = profilePetParamsSchema.parse(request.params)

  const petGallery = makeFetchPetGalleryImagesUseCase()
  try {
    const { images } = await petGallery.execute({
      petId,
    })

    return reply.status(200).send({
      images,
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
