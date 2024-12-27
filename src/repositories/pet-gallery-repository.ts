import { PetGallery, Prisma } from '@prisma/client'

export interface PetGalleryRepository {
  save(data: Prisma.PetGalleryUncheckedCreateInput): Promise<PetGallery>
  findManyByPetId(petId: string): Promise<PetGallery[]>
}
