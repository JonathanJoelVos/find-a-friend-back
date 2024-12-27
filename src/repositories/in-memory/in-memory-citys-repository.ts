import { City, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { CitysRepository } from '../citys-repository'

export class InMemoryCitysRepository implements CitysRepository {
  public items: City[] = []

  async findAll() {
    return this.items
  }

  async findManyByStateId(stateId: string) {
    return this.items.filter((item) => item.state_id === stateId)
  }

  async findById(cityId: string) {
    const city = this.items.find((item) => item.id === cityId)

    if (!city) {
      return null
    }

    return city
  }

  async create(data: Prisma.CityUncheckedCreateInput) {
    const city = {
      id: data.id ?? randomUUID(),
      name: data.name,
      state_id: data.state_id,
    }

    this.items.push(city)

    return city
  }

  async search(query: string) {
    const city = this.items.filter((item) => item.name.includes(query))

    return city
  }
}
