import { PrismaStateRepository } from '@/repositories/prisma/prisma-states-repository'
import { SearchStatesUseCase } from '../search-states-use-case'

export function makeSearchState() {
  const stateRepository = new PrismaStateRepository()
  const useCase = new SearchStatesUseCase(stateRepository)

  return useCase
}
