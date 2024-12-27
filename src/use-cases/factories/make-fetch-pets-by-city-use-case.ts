import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FecthPetsByCityUseCase } from '../fetch-pets-by-city-use-case'

export function makeFetchPetsByCityUseCase() {
  const petRepository = new PrismaPetsRepository()
  const fetchPetsByCityUseCase = new FecthPetsByCityUseCase(petRepository)

  return fetchPetsByCityUseCase
}
