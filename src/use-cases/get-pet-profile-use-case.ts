import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PetNotFoundError } from './errors/pet-not-exists-error'

interface GetPetProfileUseCaseRequest {
  petId: string
}

interface GetPetProfileUseCaseResponse {
  pet: Pet
}

export class GetPetProfileUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetProfileUseCaseRequest): Promise<GetPetProfileUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return {
      pet,
    }
  }
}