import { PrismaCitysRepository } from '@/repositories/prisma/prisma-citys-repository'
import { FetchCitysByStateUseCase } from '../fetch-citys-by-state-use-case'

export function makeFetchCitysByStateUseCase() {
  const citysRepository = new PrismaCitysRepository()
  const fetchCitysByStateUseCase = new FetchCitysByStateUseCase(citysRepository)

  return fetchCitysByStateUseCase
}
