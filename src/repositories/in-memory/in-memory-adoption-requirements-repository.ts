import { AdoptionRequirements, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { AdoptionRequirementsRepository } from '../adoption-requirements-repository'

export class InMemoryAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository
{
  public items: AdoptionRequirements[] = []

  async create(data: Prisma.AdoptionRequirementsUncheckedCreateInput) {
    const adoptionRequirement: AdoptionRequirements = {
      id: data.id ?? randomUUID(),
      title: data.title,
      pet_id: data.pet_id,
    }

    this.items.push(adoptionRequirement)

    return adoptionRequirement
  }

  async findManyByPetId(petId: string) {
    return this.items.filter((item) => item.pet_id === petId)
  }
}
