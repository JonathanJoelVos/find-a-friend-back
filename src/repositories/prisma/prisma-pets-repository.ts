import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findManyByCityId(cityId: string, page: number, query?: any) {
    const pets = await prisma.pet.findMany({
      where: {
        city_id: cityId,
        ...query,
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        org: true,
      },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
