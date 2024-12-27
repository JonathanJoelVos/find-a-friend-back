import { PrismaCitysRepository } from '@/repositories/prisma/prisma-citys-repository'
import { RegisterCityUseCase } from '../register-city-use-case'

export function makeRegisterCityUseCase() {
  const cityRepository = new PrismaCitysRepository()
  const useCase = new RegisterCityUseCase(cityRepository)

  return useCase
}
