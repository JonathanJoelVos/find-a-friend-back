import { PrismaPetGalleryRepository } from '@/repositories/prisma/prisma-pet-gallery-repository'
import { FetchPetGalleryImagesUseCase } from '../fetch-pet-gallery-images-use-case'

export function makeFetchPetGalleryImagesUseCase() {
  const petGalleryRepository = new PrismaPetGalleryRepository()
  const useCase = new FetchPetGalleryImagesUseCase(petGalleryRepository)

  return useCase
}
