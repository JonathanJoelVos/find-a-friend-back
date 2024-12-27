import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetGalleryRepository } from '../pet-gallery-repository'

export class PrismaPetGalleryRepository implements PetGalleryRepository {
  async save(data: Prisma.PetGalleryUncheckedCreateInput) {
    const petGallery = await prisma.petGallery.create({
      data,
    })

    return petGallery
  }

  async findManyByPetId(petId: string) {
    const petGallery = await prisma.petGallery.findMany({
      where: {
        pet_id: petId,
      },
    })

    return petGallery
  }
}
