import { QueryParamsProps } from '@/http/controllers/pets/search'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FecthPetsByCityRequest {
  cityId: string
  page: number
  query?: QueryParamsProps
}

interface FecthPetsByCityResponse {
  pets: Pet[]
}

export class FecthPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    cityId,
    page,
    query,
  }: FecthPetsByCityRequest): Promise<FecthPetsByCityResponse> {
    const pets = await this.petsRepository.findManyByCityId(cityId, page, query)

    return {
      pets,
    }
  }
}
