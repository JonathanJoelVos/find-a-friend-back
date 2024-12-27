import { PetGalleryRepository } from '@/repositories/pet-gallery-repository'

interface RegisterPetGalleryImagesUseCaseRequest {
  images: string[]
  petId: string
}

interface RegisterPetGalleryImagesUseCaseResponse {
  images: string[]
}

export class RegisterPetGalleryImagesUseCase {
  constructor(private petGalleryRepository: PetGalleryRepository) {}

  async execute({
    images,
    petId,
  }: RegisterPetGalleryImagesUseCaseRequest): Promise<RegisterPetGalleryImagesUseCaseResponse> {
    for await (const image of images) {
      await this.petGalleryRepository.save({
        image,
        pet_id: petId,
      })
    }

    return {
      images,
    }
  }
}
