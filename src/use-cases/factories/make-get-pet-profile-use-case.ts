import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetProfileUseCase } from '../get-pet-profile-use-case'

export function makeGetPetProfileUseCase() {
  const petRepository = new PrismaPetsRepository()
  const getPetProfileUseCase = new GetPetProfileUseCase(petRepository)

  return getPetProfileUseCase
}
