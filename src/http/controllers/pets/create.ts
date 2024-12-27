import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeRegisterPetGalleryImagesUseCase } from '@/use-cases/factories/make-register-pet-gallery-images-use-case'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetParamsSchema = z.object({
    orgId: z.string(),
  })

  const createPetBodySchema = z.object({
    age: z.string(),
    cityId: z.string(),
    description: z.string(),
    energy: z.coerce.number(),
    enviroment: z.string(),
    levelOfDependence: z.string(),
    name: z.string(),
    requirements: z.string(),
    size: z.enum(['small', 'medium', 'large']),
    type: z.enum(['cat', 'dog']),
  })

  const { orgId } = createPetParamsSchema.parse(request.params)

  const {
    age,
    cityId,
    description,
    energy,
    enviroment,
    levelOfDependence,
    name,
    requirements,
    size,
    type,
  } = createPetBodySchema.parse(request.body)

  const images = request.files

  if (images.length <= 0) {
    return reply.status(400).send({
      message: 'É necessário no mínimo 1 imagem do pet',
    })
  }

  const photo = images[0].filename

  const registerPet = makeRegisterPetUseCase()
  const registerPetGalleryImages = makeRegisterPetGalleryImagesUseCase()

  try {
    const { pet } = await registerPet.execute({
      age,
      cityId,
      description,
      energy,
      enviroment,
      levelOfDependence,
      name,
      orgId,
      photo,
      requirements,
      size,
      type,
    })

    await registerPetGalleryImages.execute({
      images,
      petId: pet.id,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }
  }
}
