import { AdoptionRequirements, Prisma } from '@prisma/client'

export interface AdoptionRequirementsRepository {
  create(
    adoptionRequirement: Prisma.AdoptionRequirementsUncheckedCreateInput,
  ): Promise<AdoptionRequirements>
  findManyByPetId(petId: string): Promise<AdoptionRequirements[]>
}
