import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CitysRepository } from '../citys-repository'

export class PrismaCitysRepository implements CitysRepository {
  async findAll() {
    const citys = await prisma.city.findMany()

    return citys
  }

  async findById(cityId: string) {
    const city = prisma.city.findUnique({
      where: {
        id: cityId,
      },
    })

    return city
  }

  async create(data: Prisma.CityUncheckedCreateInput) {
    const city = await prisma.city.create({
      data,
    })

    return city
  }

  async findManyByStateId(stateId: string) {
    const citys = await prisma.city.findMany({
      where: {
        state_id: stateId,
      },
    })

    return citys
  }

  async search(query: string) {
    const city = await prisma.city.findMany({
      where: {
        name: {
          contains: query,
        },
      },
    })

    return city
  }
}
