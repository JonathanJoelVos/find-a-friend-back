import { Prisma, State } from '@prisma/client'
import { randomUUID } from 'crypto'
import { StatesRepository } from '../states-repository'

export class InMemoryStatesRepository implements StatesRepository {
  public items: State[] = []

  async findAll() {
    return this.items
  }

  async create(data: Prisma.StateUncheckedCreateInput) {
    const state: State = {
      id: data.id ?? randomUUID(),
      name: data.name,
    }

    this.items.push(state)

    return state
  }

  async findByName(name: string) {
    const state = this.items.find((item) => item.name === name)

    if (!state) {
      return null
    }

    return state
  }
}
