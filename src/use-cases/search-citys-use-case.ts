import { CitysRepository } from '@/repositories/citys-repository'
import { City } from '@prisma/client'

interface SearchCitysUseCaseRequest {
  query: string
}

interface SearchCitysUseCaseResponse {
  citys: City[]
}

export class SearchCitysUseCase {
  constructor(private citysRepository: CitysRepository) {}

  async execute({
    query,
  }: SearchCitysUseCaseRequest): Promise<SearchCitysUseCaseResponse> {
    const citys = await this.citysRepository.search(query)

    return {
      citys,
    }
  }
}
