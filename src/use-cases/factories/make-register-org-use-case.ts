import { AxiosCepService } from '@/http/services/axios/axios-cep-service'
import { PrismaCitysRepository } from '@/repositories/prisma/prisma-citys-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaStateRepository } from '@/repositories/prisma/prisma-states-repository'
import { RegisterOrgUseCase } from '../register-org-use-case'

export function makeRegisterOrgUseCase() {
  const orgRepository = new PrismaOrgsRepository()
  const stateRepository = new PrismaStateRepository()
  const cityRepository = new PrismaCitysRepository()
  const cepService = new AxiosCepService()
  const useCase = new RegisterOrgUseCase(
    orgRepository,
    stateRepository,
    cityRepository,
    cepService,
  )

  return useCase
}
