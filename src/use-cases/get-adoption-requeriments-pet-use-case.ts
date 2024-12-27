import { AdoptionRequirementsRepository } from '@/repositories/adoption-requirements-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { AdoptionRequirements } from '@prisma/client'
import { PetNotFoundError } from './errors/pet-not-exists-error'

interface GetAdoptionRequirementsPetUseCaseRequest {
  petId: string
}

interface GetAdoptionRequirementsPetUseCaseResponse {
  adoptionRequirements: AdoptionRequirements[]
}

export class GetAdoptionRequirementsPetUseCase {
  constructor(
    private adoptionRequirementsRepository: AdoptionRequirementsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    petId,
  }: GetAdoptionRequirementsPetUseCaseRequest): Promise<GetAdoptionRequirementsPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new PetNotFoundError()
    }

    const adoptionRequirements =
      await this.adoptionRequirementsRepository.findManyByPetId(petId)

    return {
      adoptionRequirements,
    }
  }
}
