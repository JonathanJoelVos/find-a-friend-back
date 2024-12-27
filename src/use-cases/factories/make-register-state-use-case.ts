import { PrismaStateRepository } from '@/repositories/prisma/prisma-states-repository'
import { RegisterStateUseCase } from '../register-state-use-case'

export function makeRegisterStateUseCase() {
  const stateRepository = new PrismaStateRepository()
  const useCase = new RegisterStateUseCase(stateRepository)

  return useCase
}
