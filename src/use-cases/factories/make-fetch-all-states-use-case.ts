import { PrismaStateRepository } from '@/repositories/prisma/prisma-states-repository'
import { FetchAllStatesUseCase } from '../fetch-all-states-use-case'

export function makeFetchAllStatesUseCase() {
  const stateRepository = new PrismaStateRepository()
  const fetchAllStates = new FetchAllStatesUseCase(stateRepository)

  return fetchAllStates
}
