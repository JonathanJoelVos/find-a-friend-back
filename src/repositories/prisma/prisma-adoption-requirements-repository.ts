import { Prisma } from '@prisma/client'
import { AdoptionRequirementsRepository } from '../adoption-requirements-repository'
import { prisma } from '../../lib/prisma'

export class PrismaAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository
{
  async create(data: Prisma.AdoptionRequirementsUncheckedCreateInput) {
    const adoptionRequirements = await prisma.adoptionRequirements.create({
      data,
    })

    return adoptionRequirements
  }

  async findManyByPetId(petId: string) {
    const adoptionRequirements = await prisma.adoptionRequirements.findMany({
      where: {
        pet_id: petId,
      },
    })

    return adoptionRequirements
  }
}
