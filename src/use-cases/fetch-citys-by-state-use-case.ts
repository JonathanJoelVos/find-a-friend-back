import { CitysRepository } from '@/repositories/citys-repository'
import { City } from '@prisma/client'

interface FetchCitysByStateUseCaseRequest {
  stateId: string
}

interface FetchCitysByStateUseCaseResponse {
  citys: City[]
}

export class FetchCitysByStateUseCase {
  constructor(private citysRepository: CitysRepository) {}

  async execute({
    stateId,
  }: FetchCitysByStateUseCaseRequest): Promise<FetchCitysByStateUseCaseResponse> {
    const citys = await this.citysRepository.findManyByStateId(stateId)

    return {
      citys,
    }
  }
}
