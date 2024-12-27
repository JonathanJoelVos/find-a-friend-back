import { PetGalleryRepository } from '@/repositories/pet-gallery-repository'
import { PetGallery } from '@prisma/client'

interface FetchPetGalleryImagesUseCaseRequest {
  petId: string
}

interface FetchPetGalleryImagesUseCaseResponse {
  images: PetGallery[]
}

export class FetchPetGalleryImagesUseCase {
  constructor(private petGalleryRepository: PetGalleryRepository) {}

  async execute({
    petId,
  }: FetchPetGalleryImagesUseCaseRequest): Promise<FetchPetGalleryImagesUseCaseResponse> {
    const images = await this.petGalleryRepository.findManyByPetId(petId)

    return {
      images,
    }
  }
}
