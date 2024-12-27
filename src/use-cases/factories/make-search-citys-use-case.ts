import { PrismaCitysRepository } from '@/repositories/prisma/prisma-citys-repository'
import { SearchCitysUseCase } from '../search-citys-use-case'

export function makeSearchCitys() {
  const citysRepository = new PrismaCitysRepository()
  const useCase = new SearchCitysUseCase(citysRepository)

  return useCase
}
