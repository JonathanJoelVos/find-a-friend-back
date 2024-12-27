import { PrismaCitysRepository } from '@/repositories/prisma/prisma-citys-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RegisterPetUseCase } from '../register-pet'

export function makeRegisterPetUseCase() {
  const petRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const citysRepository = new PrismaCitysRepository()
  const registerPetUseCase = new RegisterPetUseCase(
    petRepository,
    orgsRepository,
    citysRepository,
  )

  return registerPetUseCase
}
