import { prisma } from '@/lib/prisma'
import { Prisma, State } from '@prisma/client'
import { StatesRepository } from '../states-repository'

export class PrismaStateRepository implements StatesRepository {
  async findAll() {
    const states = await prisma.state.findMany()

    return states
  }

  async create(data: Prisma.StateUncheckedCreateInput) {
    const state = await prisma.state.create({
      data,
    })

    return state
  }

  async findByName(name: string) {
    const state = await prisma.state.findFirst({
      where: {
        name,
      },
    })

    return state
  }
}
