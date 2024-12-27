import { PrismaPetGalleryRepository } from '@/repositories/prisma/prisma-pet-gallery-repository'
import { RegisterPetGalleryImagesUseCase } from '../register-pet-gallery-images-use-case'

export function makeRegisterPetGalleryImagesUseCase() {
  const petGalleryRepository = new PrismaPetGalleryRepository()
  const useCase = new RegisterPetGalleryImagesUseCase(petGalleryRepository)

  return useCase
}
