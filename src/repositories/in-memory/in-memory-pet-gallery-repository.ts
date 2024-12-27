import { PetGallery, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PetGalleryRepository } from '../pet-gallery-repository'

export class InMemoryPetGalleryRepository implements PetGalleryRepository {
  public items: PetGallery[] = []

  async save(data: Prisma.PetGalleryUncheckedCreateInput) {
    const petGalery = {
      image: data.image,
      pet_id: data.pet_id,
      id: data.id ?? randomUUID(),
    }

    this.items.push(petGalery)

    return petGalery
  }

  async findManyByPetId(petId: string) {
    return this.items.filter((item) => item.pet_id === petId)
  }
}
