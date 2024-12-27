import { CitysRepository } from '@/repositories/citys-repository'
import { City } from '@prisma/client'

interface FetchAllCitysUseCaseResponse {
  citys: City[]
}

export class FetchAllCitysUseCase {
  constructor(private citysRepository: CitysRepository) {}

  async execute(): Promise<FetchAllCitysUseCaseResponse> {
    const citys = await this.citysRepository.findAll()

    return {
      citys,
    }
  }
}
