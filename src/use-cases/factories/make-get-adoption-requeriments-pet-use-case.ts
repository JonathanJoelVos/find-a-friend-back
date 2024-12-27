import { PrismaAdoptionRequirementsRepository } from '@/repositories/prisma/prisma-adoption-requirements-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetAdoptionRequirementsPetUseCase } from '../get-adoption-requeriments-pet-use-case'

export function makeGetAdoptionRequirementsUseCase() {
  const petRepository = new PrismaPetsRepository()
  const adoptionRequirementsRepository =
    new PrismaAdoptionRequirementsRepository()
  const useCase = new GetAdoptionRequirementsPetUseCase(
    adoptionRequirementsRepository,
    petRepository,
  )

  return useCase
}
